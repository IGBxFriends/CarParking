const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const Branch = require('../models/branch');

const router = express.Router();

const branchs = [];

router.get('/all', async ( request, response )=>{    
    try {
        const branch = await Branch.find();
        response.status(200).send(branch);
    } catch (err) {
        response.status(400).send({ message: "Ocorreu um erro", error: err });
    }
});

router.post('/', async ( request, response )=>{
    const { name, address, parkingSpace } = request.body;

    try{        
        const branch = new Branch({
            name: name,
            address: address,
            parkingSpace: parkingSpace,
            freeSpace: 0,
            register: new Date()
        })
    
        branch.save();

        return response.status(200).send(branch);
        
    }catch(ex){
       response.status(400).send({ message: "Não foi possível realizar o cadastro dessa filial"})
    }
    

});


router.put('/:id',( request, response )=>{
    const id = request.params.id;
    const { name, address, parkingSpace } = request.body;
    
    if(isUuid(id) == false){
        return response.status(401).send({ message: "O ID informado está inválido" });        
    }

    const branch = {
        id: id,
        name: name,
        address: address,
        parkingSpace: parkingSpace,
        freeSpace: parkingSpace,
        register: new Date()
    }

    const branchIndex = branchs.findIndex( (x) => x.id == id);

    branchs[branchIndex] = branch;

   return response.status(201).send(branch);
    
});

router.delete('/:id', ( request, response )=>{
    const id = request.params.id;

    if(isUuid(id) == false){
        return response.status(400).send({ message: "O ID informado está inválido" })
    }

    const branchIndex = branchs.findIndex( (x) => x.id == id );

    if(branchIndex < 0 ){
       return response.status(400).send({ message: "Filial não encontrada" })
    }

    branchs.splice(branchIndex, 1);

    return response.status(202).send({ message: "Registro deletado com sucesso."});

});

module.exports = router;