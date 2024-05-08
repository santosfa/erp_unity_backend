require('dotenv').config();
const express = require('express');
const http = require('http');
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
server.use('/api/health',require('./routes/healthRoutes'));
server.use('/api/auth',require('./routes/auth/authRoutes'));
server.use('/api/user',require('./routes/user/userRoutes'));
server.use('/api/customer',authMiddleware,require('./routes/customer/customerRoutes'));
server.use('/api/contract',require('./routes/contract/contractRoutes'));
server.use('/api/location',require('./routes/location/locationRoutes'));
server.use('/api/form',require('./routes/form/formRoutes'));

// Middleware para lidar com rotas não encontradas
server.use((req, res) => {
    res.status(404).json({ error: 'ENDPOINT NOT FOUND' });
});

const httpServer = http.createServer(server);

// Configuração do timeout para conexões em milissegundos
httpServer.keepAliveTimeout = 65000; // Timeout de 65 segundos

// Iniciar o servidor HTTP
httpServer.listen(port, () => {
    console.log(`SERVICE RUNNING AT PORT : ${port}`);
});
