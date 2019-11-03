const express = require('express');

const server = express();

server.use(express.json());

const projects = [
    {
        id: "1",
        title: "Novo projeto",
        tasks: ["Nova tarefa"]
    },
    {
        id: "2",
        title: "Novo projeto 2",
        tasks: ["Nova tarefa 2"]
    }
];

const find = projects.find((index) => {
    return index === index;
});

console.log(find);

// Hello Desafio
server.get('/', (req, res) => {

    return res.json('Hello, desafio');
});

// List All
server.get('/projects', (req, res) => {

    return res.json(projects);
});

// List
server.get('/projects/:index', (req, res) => {
    const { index } = req.params;

    return res.json(projects[index]);
});

// Create
server.post('/projects', (req, res) => {
    const  projeto = req.body;

    projects.push(projeto);

    return res.json(projects);
});

server.post('/projects/:index/tasks', (req, res) => {
    const { index } = req.params;
    const { title } = req.body;

    projects[index].tasks.push(title)

    return res.json(projects[index]);
});

server.put('/projects/:index', (req, res) => {
    const { index } = req.params;
    const { title } = req.body;

    projects[index].title = title

    return res.json(projects[index]);
});

server.delete('/projects/:index', (req, res) => {
    const { index } = req.params;

    if (index > projects.length || projects.length < 1) {
        return res.status(400).json({ error: 'Project not found'})
    }

    projects.splice(index, 1);

    return res.json({ message: 'deletado' });
});

server.listen(3000);