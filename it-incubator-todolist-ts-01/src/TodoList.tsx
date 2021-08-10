import React, {ChangeEvent, useState} from "react";
import {Input} from "./Input/Input";
import {Button} from "./Input/Button";
import {UniversalButton} from "./Input/ButtonFilter/UniversalButton";

export type ListType = {
    isDone: boolean
    id: string
    name: string
}

type TodoListPropsType = {
    title: string
    tasks: Array<ListType>
    removeTask: (tId: string) => void
    addTask: (name: string) => void
    changeTaskStatus: (tId: string, isDone: boolean) => void
}


export type filterType = 'All' | 'Completed' | 'Active'

export function TodoList(props: TodoListPropsType) {

    let [name, setName] = useState<string>('')

    let [filter, setFilter] = useState<filterType>('All')

    let [error, setError] = useState<string | null>(null)

    function changeFilter(value: filterType) {
        setFilter(value)
    }

    /*  const UniversalCallback = (value: filterType) => {
          changeFilter(value)
      }*/

    let tasks2 = props.tasks;
    if (filter === 'Completed') {
        tasks2 = props.tasks.filter(t => t.isDone)
    }
    if (filter === 'Active') {
        tasks2 = props.tasks.filter(t => !t.isDone)
    }


    const tasksJSXElements = tasks2.map(t => {

        const RemoveTaskHandler = (tId: string) => {
            props.removeTask(tId)
        }

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked)


        /*const removeTask = (tId: string) => props.removeTask(tId)*/

        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type='checkbox'
                   onChange={changeTaskStatus}
                   checked={t.isDone}/><span>{t.name}</span>
            {/*<button onClick={removeTask}>X</button>*/}
            {/*<UniversalButton callBack={()=>{removeTask(t.id)}} title={'X'} />*/}
            <UniversalButton callBack={() => RemoveTaskHandler(t.id)} title={'x'}/>
        </li>

    })

    /* const AllFilter = (value: filterType) =>{ ///Объединяем фильтр в  одну функцию, упраздняем переменные onClickAllButton, рефакторим
     changeFilter(value)
 }*/

    const onClickAllButton = () => { //  1.выносили функции в отдельные переменные
        changeFilter('All')
    }
    const onClickActiveButton = () => {
        changeFilter('Active')
    }
    const onClickCompletedButton = () => {
        changeFilter('Completed')
    }


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
            </div>
            <div className={'AddTaskField'}>
                <Input error={error}
                       setError={setError}
                       addTask={props.addTask}
                       name={name}
                       setName={setName}
                />

                <Button addTask={props.addTask}
                        name={name}
                        setName={setName}
                        setError={setError}
                />
            </div>
            {error && <div className='error-message'>{error}</div>}
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button className={filter === 'All' ? 'active-filter' : ''} onClick={onClickAllButton}>All</button>
                <button className={filter === 'Active' ? 'active-filter' : ''} onClick={onClickActiveButton}>Active
                </button>
                <button className={filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onClickCompletedButton}>Completed
                </button>

                {/*<UniversalButton filter={filter} callBack={() => {UniversalCallback('All')}}
                                 title={'All'}/> рефакторинг, вынесение кнопок фильтров в отдельную компоненту
                <UniversalButton filter={filter} callBack={() => {UniversalCallback('Active')}}
                                 title={'Active'}/>
                <UniversalButton filter={filter} callBack={() => {UniversalCallback('Completed')}}
                                 title={'Completed'}/>*/}
            </div>
        </div>

    )
}