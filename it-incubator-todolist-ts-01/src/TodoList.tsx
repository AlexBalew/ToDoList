import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './componets/Button/Button';
import {Input} from "./componets/Input";
import {NewInput} from "./componets/NewInput";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoliseId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
}

export const Todolist = React.memo((props: PropsType) => {

    const tsarFooHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue, props.todolistId)
    }
    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState('');
    const addTaskHandler = () => {
        if(title.trim()!==''){
            props.addTask(title, props.todolistId);
            setTitle('')
        }else{
            setError('Field is required')
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            {/*<Input  addTask={props.addTask} todolistId={props.todolistId}/>*/}

            <div className={'both'}>
                <NewInput error={error} setError={setError} title={title} setTitle={setTitle} addTask={props.addTask} todolistId={props.todolistId}/>
                <Button name={'+'} callback={addTaskHandler}/>
            </div>


            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            {/*<button onClick={addTask}>+</button>*/}

        </div>
        <ul>
            {
                props.tasks.map(t => {


                    const removeHandler = () => {
                        props.removeTask(t.id, props.todolistId)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'X'} callback={removeHandler}/>
                    </li>
                })
            }
        </ul>
        <div>


            <Button name={'all'} filter={props.filter} callback={() => tsarFooHandler('all')}/>
            <Button name={'active'} filter={props.filter} callback={() => tsarFooHandler('active')}/>
            <Button name={'completed'} filter={props.filter} callback={() => tsarFooHandler('completed')}/>

        </div>
    </div>
})
