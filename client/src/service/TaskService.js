export  default class TaskService {
    static apiPath = '/api/v1/task'

    static findAll() {
        return fetch(TaskService.apiPath)
            .then(response => response.json())
            .catch(error => {
                console.log('error', error);
                return [];
            })


    }

    static findById(id) {

    }

    static update(id, task) {

    }

    static create(task) {

    }

    static delete(id) {
        return fetch(`${TaskService.apiPath}/${id}`, {method: 'DELETE'});

    }


}