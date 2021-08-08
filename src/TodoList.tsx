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
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}



function TodoList(props: PropsType) {

    const [title, setTitle] = useState('')

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedHandler = () => props.changeFilter('completed')
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => { setError(null); if (e.key === 'Enter') addTask() }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                    onKeyPress={onKeyHandler}
                    onChange={onTitleChangeHandler}
                    className={error ? 'error' : ''} />

                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeStatus(t.id, newIsDoneValue)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
                                <span>{t.title}</span>
                                <button onClick={removeTask}>delete</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;