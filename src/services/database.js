const mongoose = require('mongoose');

const user = "userBuildingAccess";
const password = "123cervello01";
const database = "CarParking";
const cluster = "@igbxbuild.9nol2.mongodb.net";
const uri = `mongodb+srv://${user}:${password}${cluster}/${database}`;


//const db = mongoose.connect(uri, {useNewUrlParser: true,  useUnifiedTopology: true, autoIndex:false } );

mongoose.Promise = global.Promise;
mongoose.connect(uri,{  
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("MongoDB Connection status: "+mongoose.connection.readyState)
}).catch( (err) =>{
    console.log("Houve um erro ao se conectar ao mongodb: "+ err);
});

module.exports = mongoose;
