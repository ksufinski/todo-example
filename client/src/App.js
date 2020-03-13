import React from 'react';
import './App.css';
import TaskService from './service/TaskService';

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            tasks: []
        }
    }


    componentDidMount = () => {
        console.log('componentDidMount');

        this.requestAllTasks();
    }

    componentWillUnmount() {

    }

    render() {
        const self = this;
        return (
            <div>
                {self.state.tasks.map((task, index) =>
                    <div key={index}>{task.name}
                        <span onClick={() => this.onDeleteTaskClick(task.id)}>X</span>
                    </div>)}
            </div>
        );
    }

    requestAllTasks = () => {
        TaskService.findAll().then((tasks => {
            this.setState({tasks});
        }));
    }

    onDeleteTaskClick(id) {
        TaskService
            .delete(id)
            .then(this.requestAllTasks);

    }

}