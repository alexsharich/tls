import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, { TaskType } from './TodoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ]);

    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id != id);
        setTasks(filterTasks)
    }

    const addTask = (title: string) => {
       /*  const newTask:  TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyTask = [...tasks]
        copyTask.push(newTask)
        setTasks(copyTask) */
        setTasks([{id:v1(),title,isDone:false},...tasks])
    }

    let [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <TodoList title='What to learn ?'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask} 
                />
        </div>
    );
}



export default App;
