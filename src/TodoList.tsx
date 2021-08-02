import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { setConstantValue } from 'typescript';
import { FilterValuesType } from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: string) => void,
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}



function TodoList(props: PropsType) {
    const [title, setTitle] = useState('')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedHandler = () => props.changeFilter('completed')
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') addTask() }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                    onKeyPress={onKeyHandler}
                    onChange={onTitleChangeHandler} />

                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => { props.removeTask(t.id) }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                                <button onClick={removeTask}>delete</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;