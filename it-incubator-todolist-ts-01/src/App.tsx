import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {ListType} from "./TodoList";
import {v1} from 'uuid';

function App() {

    let [tasks2, setTasks] = useState<Array<ListType>>([
        {id: v1(), name: 'Metallica', isDone: true},
        {id: v1(), name: 'Ghost', isDone: false},
        {id: v1(), name: 'Neuropunk', isDone: false},
        {id: v1(), name: 'Korn', isDone: true},
        {id: v1(), name: 'Static-X', isDone: true},
        {id: v1(), name: 'Ella Fitzgerald  ', isDone: false},
    ])

    const removeTask = (taskID: string) => {
        const filter = tasks2.filter(t => t.id !== taskID)
        setTasks(filter)
    }

    const addTask = (name: string) => {
        const newTask: ListType = {
            id: v1(),
            name,
            isDone: false
        }
        setTasks([newTask, ...tasks2])
    }

    const changeTaskStatus = (tId: string, isDone: boolean) => {

        const updatedTasks = tasks2.map(t => t.id === tId ? {...t, isDone} : t)

        setTasks(updatedTasks)
    }

    return (
        <div>
            <div className='App'>
                <TodoList title={'Things To Listen'}
                          tasks={tasks2}
                          removeTask={removeTask}
                          addTask={addTask}
                          changeTaskStatus={changeTaskStatus}
                />
            </div>
        </div>
    )
}


export default App

