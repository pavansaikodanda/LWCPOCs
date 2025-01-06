import { LightningElement, track } from 'lwc';

export default class ComponentB extends LightningElement {
    @track tasks = [
        { id: 1, name: 'Review PRs', completed: false },
        { id: 2, name: 'Update documentation', completed: true },
        { id: 3, name: 'Team meeting', completed: false }
    ];

    handleTaskToggle(event) {
        const taskId = event.target.dataset.taskId;
        this.tasks = this.tasks.map(task => 
            task.id === parseInt(taskId) 
                ? {...task, completed: !task.completed}
                : task
        );
    }
}