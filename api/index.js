var express = require('express');
var app = express();
app.use(express.json());

const validator = require('./validator/newTaskValidator.js');

const database = [
    {
        id: 1,
        name: 'clean up kitchen',
        description: 'ASAP',
        completed: false
    },
    {
        id: 2,
        name: 'покурить сижку',
        description: 'ASAP',
        completed: true
    }


];

app.get('/api/v1/task', function (req, res) {
    res.send(database);
});

app.get('/api/v1/task/:id', function (req, res) {
    const targetId = req.params.id;
    const task = database.find(tasks => tasks.id === +targetId);

    if (!task) {
        res.sendStatus(404);
    } else {
        res.send(task);
    }
});

app.put('/api/v1/task/:id', function (req, res) {

    const targetId = req.params.id;
    const targetTaskUpdate = req.body;
    let taskIndex = database.findIndex(tasks => tasks.id === +targetId);

    if (taskIndex < 0) {
        res.sendStatus(400);
    } else {
        database.splice(taskIndex, 1, targetTaskUpdate);
        res.sendStatus(200);
    }
})

app.post('/api/v1/task', function (req, res) {
    const newTask = req.body;

    try {
        validator(database, newTask);

        const nextId = database.length + 1;
        newTask.id = nextId;
        database.push(newTask);
        res.send({id:nextId});
    } catch (e) {
        console.error(e.message);
        res.status(400).send({errorMessage: e.message});
    }


})

app.delete('/api/v1/task/:id', function (req, res) {
    const targetId = req.params.id;
    let taskIndex = database.findIndex(tasks => tasks.id === +targetId);

    if (taskIndex < 0) {
        res.sendStatus(400);
    } else {
        database.splice(taskIndex, 1);
        res.sendStatus(200);
    }
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});