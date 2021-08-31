const { response } = require('express');
const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const Client = require('../models/client');

const router = express.Router();

const clients = [];

router.get('/all', async ( request, response )=>{
    const clients = await Client.find();
    
    if(clients.length == 0){
        console.log(clients)
        return response.status(400).send({ message: "Nenhum registro encontrado"})
    }
    console.log(clients)
    return response.status(200).send(clients);
});

router.post('/', ( request, response )=>{
    const { name, cellphone } = request.body;

    const clientIndex = clients.find( (cli) => cli.name == name & cli.cellphone == cellphone );
    
    console.log(clientIndex)
    try {
        if(!clientIndex == 0 ){
            return response.status(400).send({ message: "Cliente já cadastrado" })
        }else{
    
            const client = {
                id: uuid(),
                name: name,
                cellphone: cellphone
            }
        
            clients.push(client);
    
            return response.status(200).send({ message: "Registro cadastrado com sucesso"});
        }
    } catch (error) {
        return response.status(400).send({ message: "Não foi possível efetuar o cadastro do cliente" })
    }
});

router.put('/:id',( request, response )=>{
    const id = request.params.id;
    const { name, cellphone } = request.body;

    try {
        if(isUuid(id) == false){
         return response.status(400).send({ message: "O ID informado está inválido" })
        }

        const clientIndex = clients.findIndex( (cli) => cli.id == id );

        if(!clientIndex == 0){
            return response.status(400).send({ message: "Cliente não encontrado" })
        }
        
        const client = {
            id: id,
            name: name,
            cellphone: cellphone
        }

        clients[clientIndex] = client

        return response.status(201).send({ message: "Registro alterado com sucesso" })

    } catch (error) {
        return response.status(400).send({ message: "Não foi possível alterar o registro"});
    }
});


router.delete('/:id', ( request, response )=>{
    const id = request.params.id;

    if(isUuid(id) == false){
        return response.status(400).send({ message: "O ID informado está inválido" })
    }

    try {
        const clientIndex = clients.findIndex( (cli) => cli.id == id );

        if(!clientIndex == 0){
            return response.status(400).send({ message: "Cliente não encontrado" });
        }else{
            clients.splice(clientIndex, 1);

            return response.status(200).send({ message: "Registro deletado com sucesso" })
        }

    } catch (error) {
        return response.status(400).send({ message: "Não foi possível deletar o registro"});
    }
});

router.get('/Validation/:id', ( request, response ) => {
    const id = request.params.id;

    if(isUuid(id) == false){
        return response.status(400).send({ message: 0 }) //ID inválido
    }

    const clientIndex = clients.findIndex( (cli) => cli.id == id );

    if(!clientIndex == 0){
        return response.status(400).send({ message: 2 }) //ID não encontrado
    }else{
        return response.status(200).send({ message: 1 }) //Registro encontrado
    }
});

module.exports = router;