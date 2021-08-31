const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const Branch = require('../models/carPark');

const router = express.Router();

const msgInvalid = "O ID informado está inválido";
const carParks = [];

router.get('/', ( request, response )=>{
    if( carParks.length === 0 ){
        response.status(401).send({ message: "Nenhuma reserva encontrada" })
    }

    response.status(200).send(carParks);
});

router.post('/',( request, response )=>{
    const { board, idClient, idBranch, startTime, endTime, status, price } = request.body;

    const carPark = {
        id: uuid(),
        board: board,
        idClient: idClient,
        idBranch: idBranch,
        startTime: startTime,
        endTime: endTime,
        price: price,
        status: status
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