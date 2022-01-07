import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            task: '',
            editIndex: -1,
            editTask: '',
            editImportant: false,
            nextId: 1,
            create: true, 
            edit: false,
            important: false,
            completed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.editImportant = this.editImportant.bind(this);
        this.complete = this.complete.bind(this);
    }

    handleChange(event) { 
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    editImportant(event) { 
        this.setState({
            editImportant: !this.state.editImportant
        });
    }

    complete(event) { 
        this.setState({
            completed: !this.state.completed
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const todos = this.state.todos.slice();
        let nextId = this.state.nextId;
        if (this.state.task === "") {
            return
        }

        if (this.state.todos.find(task => task.task.toLowerCase() === this.state.task.toLowerCase())) {
            alert("Todo already exists");
            this.setState({
                task: ''
            });
            return
        }

        const task = {
            'id': this.state.nextId,
            'task': this.state.task,
            'completed': false,
            'important': this.state.important
        }

        todos.push(task);

        this.setState({
            todos: todos,
            task: '',
            nextId: nextId++,
            create: false,
            important: false
        });
    }

    deleteTodo(id) {
        const todos = this.state.todos.slice();

        this.setState({
            todos: todos.filter((item, index) => (index !== id))
        });
    }

    handleEdit(event) {
        event.preventDefault();
        const todos = this.state.todos.slice();
        const todoIndex = this.state.editIndex;
        todos[todoIndex].task = this.state.editTask;
        todos[todoIndex].important = this.state.editImportant;
        todos[todoIndex].completed = this.state.completed;

        this.setState({
            todos: todos,
            editIndex: -1,
            editTask: '',
            edit: false,
            editImportant: false,
            completed: false
        });
    }

    render() {
        if (this.state.create) {
            return (
                <div>
                    <div className="jumbotron bg-primary text-center col-md-12" style={{marginTop: '-5px'}}>
                        <h1>Todo App</h1>
                    </div>

                    <div className="container text-center">
                        <h2>Add Task</h2>
        
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="task" className="sr-only">Task: </label>
                                <input type="text" className="form-control" name="task" id="task" value={this.state.task} onChange={this.handleChange} /><br />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="important" id="important" onClick={this.handleChange} />
                                <label htmlFor="important">Important</label>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            );
        }

        if (this.state.edit) {
            if (this.state.editImportant) {
                return (
                    <div>
                        <div className="jumbotron bg-primary text-center col-md-12" style={{marginTop: '-5px'}}>
                            <h1>Todo App</h1>
                        </div>
                        <div className="container text-center">
                        <h2>Edit Task</h2>
                        <form onSubmit={this.handleEdit}>
                            <div className="form-group">
                                <label htmlFor="task" className="sr-only">Task: </label>
                                <input type="text" className="form-control" name="editTask" id="task" value={this.state.editTask} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="editImportant" id="important" defaultChecked onClick={this.editImportant} />
                                <label htmlFor="important">Important</label>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="completed" id="completed" onClick={this.complete} />
                                <label htmlFor="completed">Mark as Completed</label>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary">Edit</button>
                        </form>
                    </div>
                    </div>
                )
            }
            
            return (
                <div>
                    <div className="jumbotron bg-primary text-center col-md-12" style={{marginTop: '-5px'}}>
                        <h1>Todo App</h1>
                    </div>
                    <div className="container text-center">
                        <h2>Edit Task</h2>
                        <form onSubmit={this.handleEdit}>
                            <div className="form-group">
                                <label htmlFor="task" className="sr-only">Task: </label>
                                <input type="text" className="form-control" name="editTask" id="task" value={this.state.editTask} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="editImportant" id="important" onClick={this.editImportant} />
                                <label htmlFor="important">Important</label>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="completed" id="completed" onClick={this.complete} />
                                <label htmlFor="completed">Mark as Completed</label>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary">Edit</button>
                        </form>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="jumbotron bg-primary text-center col-md-12" style={{marginTop: '-5px'}}>
                    <h1>Todo App</h1>
                </div>

                <div className="container text-center">
                    <h2 className="h3">Add Task</h2>
    
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="task" className="sr-only">Task: </label>
                            <input type="text" className="form-control" name="task" id="task" value={this.state.task} onChange={this.handleChange} /><br />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="important" id="important" onClick={this.handleChange} />
                            <label htmlFor="important">Important</label>
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary">Add</button>
                    </form>

                </div>
                <div className="col-md-12 text-center">
                    <h2 className="mt-3">Tasks</h2>

                    <table className="table col-md-12">
                        <thead>
                            <th>S/No.</th>
                            <th>Task</th>
                            <th>Options</th>
                        </thead>
                        <tbody>
                        {this.state.todos.map((todo, index) => (
                            <tr className = {todo.completed ? 'bg-success' : (todo.important ? "bg-danger" : "bg-secondary")}>
                                <td>{index+1}</td>
                                <td>{todo.task}</td>
                                <td><button 
                                    type="button"
                                    onClick={() => this.setState({
                                        editIndex: index,
                                        editTask: todo.task,
                                        edit: true,
                                        editImportant: todo.important,
                                    })}
                                    style={{display: todo.completed ? 'none' : 'inline'}}
                                    className="btn text-white" 
                                >
                                    Edit
                                </button>
                                <button type="button" className="btn text-white" onClick={() => this.deleteTodo(index)}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                
            </div>
        );
    }
}

export default App;