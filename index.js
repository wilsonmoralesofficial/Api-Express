const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors,errorHandler, boomErrorHandler} = require ('./middlewares/error.handler');



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const whiteList = ['http://127.0.0.1:5500','http://localhost:3000','Aqui puede ir algun aplicación que ya se encuentre desplegada en un dominio'];

const options = {
  origin : (origin,callback) =>{
    if(whiteList.includes(origin)){
      callback(null,true);
    }
    else{
      callback(new Error('Cliente no permitido'))
    }
  }
}

app.use(cors(options));

// app.get('/nueva-ruta', (req, res) => {
//   res.send("Nueva- Ruta");
// })

// app.get('/', (req, res) => {
//   res.send("Servidor de express");
// });

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, (() => {
  // console.log("Mi puerto " + port);
}));

// Podemos pasarle o no pasarle un callback a app.listen()




