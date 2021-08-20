import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import { UniversalButton } from './components/UniversalButton';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, TlID: string) => void
    changeFilter: (value: FilterValuesType, TlID: string) => void
    addTask: (title: string, TlID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, TlID: string) => void
    filter: FilterValuesType
    TlID: string
}

export const Todolist = React.memo((props: PropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.TlID);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.TlID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.TlID);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>

           {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>*/}
           {/* <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>*/}

            <UniversalButton filter={props.filter}
                             title={'all'}
                             callback={()=> {props.changeFilter('all', props.TlID)}}
                             TlID={props.TlID} />
            <UniversalButton filter={props.filter}
                             title={'active'}
                             callback={()=> {props.changeFilter('active', props.TlID)}}
                             TlID={props.TlID} />
            <UniversalButton filter={props.filter}
                             title={'completed'}
                             callback={()=> {props.changeFilter('completed', props.TlID)}}
                             TlID={props.TlID} />
        </div>
    </div>
})
