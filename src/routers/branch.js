const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const Branch = require('../models/branch');

const router = express.Router();

const branchs = [];

router.get('/',( request, response )=>{
    
    if( branchs.length == 0 ){
        return response.status(400).send({ message: "Nenhuma Filial cadastrada"});
    }

    return response.status(200).send(branchs);

});

router.post('/', ( request, response )=>{
    const { name, address, parkingSpace } = request.body;

    const filialIndex = branchs.find( (filial)=> filial.name == name & filial.address == address );
  
    try{        
        if(!filialIndex == 0 ){                      
           return response.status(400).send({ 
                message: "Filial já cadastrada"
            });
        }else{
    
        const branch = {
            id: uuid(),
            name: name,
            address: address,
            parkingSpace: parkingSpace,
            freeSpace: parkingSpace,
            register: new Date()
        }
    
        branchs.push(branch);
    
        return response.status(200).send({
            message: "Registro criado com sucesso",
            filial: branch
        });
    }

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