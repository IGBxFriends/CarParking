const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const CarPark = require('../models/carPark');
const Branch = require('../models/branch');
const Client = require('../models/client');

const router = express.Router();

const msgInvalid = "O ID informado está inválido";
const carParks = [];


router.get('/all', async ( request, response )=>{
   try {
       const carPark = await CarPark.find();
       response.status(200).send(carPark);
   } catch (err) {
       response.status(400).send({ message: "Ocorreu um erro", erro: err });
   }
});

router.post('/Register', async ( request, response, next )=>{
    const { board, idClient, idBranch, startTime, endTime, price, status } = request.body;
      
    const error = [];

    try {        
        await Client.findById(idClient).catch( (err) => error.push({ Error: "ID do cliente não encontrado" }));
        
        await Branch.findById(idBranch).catch( (err) => error.push( { Error: "ID da filial não encontrada" }));

        if(error.length > 0 ){
            return response.status(400).send(error);
        }
          
        const newCarPark = new CarPark({
            board: board, 
            idClient: idClient, 
            idBranch: idBranch, 
            startTime: startTime, 
            endTime: endTime, 
            price: price, 
            status: status
        })

        newCarPark.save();

        return response.status(200).send({ 
            message: "Reserva efetuada",
            client: newCarPark
        });
        
    } catch (err) {
        response.status(400).send({ message: "Ocorreu um erro: ", error: err });

    }
    
});

router.put('/:id', ( request, response )=>{
    const id = request.params.id;
    const { board, idClient, idBranch, startTime, endTime, status, price } = request.body;

    const carPark = {
        id: id,
        board: board,
        idClient: idClient,
        idBranch: idBranch,
        startTime: startTime,
        endTime: endTime,
        price: price,
        status: status
    }

    try {
        if(isUuid(id) == false){
            return response.status(400).send({ message: msgInvalid })
        }

        const carParkIndex = carParks.findIndex( (car) => car.id == id );

        if(!carParkIndex == 0){
            return response.status(400).send({ message: "Registro não encontrado" })
        }else{

            const carPark = {
                id: id,
                board: board,
                idClient: idClient,
                idBranch: idBranch,
                startTime: startTime,
                endTime: endTime,
                price: price,
                status: status
            }

            carParks[carParkIndex] = carPark;

            return response.status(200).send({ message: "Registro alterado com sucesso" });
        }

    } catch (error) {
        return response.status(400).send({ message: "Não foi possível alterar o registro"});
    }

});

router.delete('/', ( request, response )=>{
    const id = request.params.id;

    try {
        if(isUuid(id) == false){
            return response.status(400).send({ message: msgInvalid })
        }

        const carParkIndex = carParks.findIndex( (car) => car.id == id );

        if(!carParkIndex == 0){
            return response.status(400).send({ message: "Registro não encontrado" })
        }else{

            carParks.splice(carParkIndex, 1);

            return response.status(200).send({ message: "Registro deletado com sucesso" });

        }

    } catch (error) {
        return response.status(400).send({ message: "Não foi possível deletar o registro"});
    }
});

module.exports = router;