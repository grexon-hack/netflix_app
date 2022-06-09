import app from './app.js';
import {sequelize} from './database/database.js';

app.listen(3001, function () {
    console.log('la app esta corriendo en el puerto 3001');

    sequelize.sync({force:true}).then(() => {
        console.log("la base de datos esta conectada")
    }).catch(error => {
        console.log('Se ha producido un error: '+ error)
    })
})