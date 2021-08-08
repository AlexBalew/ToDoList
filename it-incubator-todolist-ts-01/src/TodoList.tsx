import React, {useState} from "react";
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
}


export type filterType = 'All' | 'Completed' | 'Active'

export function TodoList(props: TodoListPropsType) {

    const [name, setName] = useState<string>('')

    let [filter, setFilter] = useState<filterType>('All')

    function changeFilter(value: filterType) {
        setFilter(value)
    }

    const UniversalCallback = (value: filterType) => {
        changeFilter(value)
    }

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
        /*const removeTask = (tId: string) => props.removeTask(tId)*/


        return <li key={t.id}>
            <input type='checkbox' checked={t.isDone}/><span>{t.name}</span>
            {/*<button onClick={removeTask}>X</button>*/}
            {/*<UniversalButton callBack={()=>{removeTask(t.id)}} title={'X'} />*/}
            <UniversalButton callBack={()=>RemoveTaskHandler(t.id)} title={'X'} />
        </li>

    })

       /* const AllFilter = (value: filterType) =>{ ///Объединяем фильтр в  одну функцию, упраздняем переменные onClickAllButton, рефакторим
        changeFilter(value)
    }*/

    /*const onClickAllButton = () => { //  1.выносили функции в отдельные переменные
        changeFilter('All')
    }
    const onClickActiveButton = () => {
        changeFilter('Active')
    }
    const onClickCompletedButton = () => {
        changeFilter('Completed')
    }*/




    return (
        <div>
            <div>
                <h3>{props.title}</h3>
            </div>
            <Input addTask={props.addTask} name={name} setName={setName} />
            <Button addTask={props.addTask} name={name} setName={setName} />
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                {/*<button onClick={onClickAllButton}>All</button> //1.использовали созданные ранее переменные для рефакторинга
                <button onClick={onClickActiveButton}>Active</button>
                <button onClick={onClickCompletedButton}>Completed</button>*/}
                <UniversalButton callBack={()=>{UniversalCallback( 'All')}} title={'All'}/>  {/*рефакторинг, вынесение кнопок фильтров в отдельную компоненту*/}
                <UniversalButton callBack={()=>{UniversalCallback( 'Active')}} title={'Active'}/>
                <UniversalButton callBack={()=>{UniversalCallback( 'Completed')}} title={'Completed'}/>
            </div>
        </div>

    )
}