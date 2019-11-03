const express = require('express');

const server = express();

server.use(express.json());

// Middleware Global
server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}, URL: ${req.url}`)
    
    next();

    console.timeEnd('Request');
});

// Middleware Local
function checkUseExisists(req, res, next) {
    if (!req.body.nome) {
        return res.status(400).json({ error: 'User not found on request body'});
    }

    return next();
}

// Query params = ?teste=1
// Route params = /user/1
// Request body = { "name": "italo cedro" }

const users = ["Italo", "Janny", "Juvenal"]

// Query parms
// List All
server.get('/users', (req, res) => {

    return res.json(users);
});

// List One
server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
});


// Create
server.post('/users', checkUseExisists, (req, res) => {
    const { nome } = req.body;

    users.push(nome);

    return res.json(users);
});

// Route params
// Update
server.put('/users/:index',  checkUseExisists, (req, res) => {
    const { index } = req.params;
    const { nome } = req.body;

    users[index] = nome;

    return res.json(users);
});

// Request body

// Delete
server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send('deletado');
});

server.listen(3333);