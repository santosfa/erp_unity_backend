//******************************
//server.js
//******************************

require('dotenv').config();
const express = require('express');
const server = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const validatePayload = require('./middleware/validatePayload');
const authMiddleware = require('./middleware/authMiddleware');

const port = process.env.SERVER_PORT;

server.use(cors());
server.use(express.json());
server.use(validatePayload);
server.use(bodyParser.json());


//----------------------------------Rotas----------------------------------------
server.use('/health',require('./routes/healthRoutes'));
server.use('/auth',require('./routes/auth/authRoutes'));
server.use('/user',require('./routes/user/userRoutes'));
server.use('/customer',authMiddleware,require('./routes/customer/customerRoutes'));
server.use('/contract',require('./routes/contract/contractRoutes'));
server.use('/location',require('./routes/location/locationRoutes'));
server.use('/form',require('./routes/form/formRoutes'));


// Middleware para lidar com rotas não encontradas
server.use((req, res) => {
    res.status(404).json({ error: 'ENDPOINT NOT FOUND' });
});


//init server
server.listen(port, ()=>{
    console.log(`SERVICE RUNNING AT PORT : ${port}`);
})



