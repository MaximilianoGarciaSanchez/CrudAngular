const mongoose = require('mongoose');

//Configuración de los parametros de la base de datos
url: 'mongodb://localhost/empleados';
dbparams ={
    //useCreateIndex: true,
    useNewUrlParser:true,
    //useFindAndModify:false,
    useUnifiedTopology:true
};

mongoose.connect('mongodb://localhost/empleados', dbparams)
        .then(db=> console.log('DB esta conectada'))
        .catch(err=>console.log(err));

module.exports = mongoose;
