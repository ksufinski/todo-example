

function validator(database, newTask) {
    const tasksAlreadyExists = database.find(task => task.id === newTask.id);

    if (tasksAlreadyExists) {
        throw Error("tasksAlreadyExists");
    } else if (!newTask.name || !newTask.name.length) {
        throw Error("task must have name");
    }

}

module.exports = validator;