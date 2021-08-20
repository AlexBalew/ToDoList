import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TodoListsAllType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TodoListsAllType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Rubber", isDone: true},
            {id: v1(), title: "Coffee", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Mellon", isDone: false},
        ]
    });



    function removeTask(id: string, TlID: string) {

        setTasks({...tasks, [TlID]:tasks[TlID].filter(t => t.id !== id)})

        /*tasks[TlID] =  tasks[TlID].filter(t => t.id !== id)
        setTasks({...tasks})*/
    }

    function addTask(title: string, TlID: string) {

        setTasks({...tasks, [TlID]:[...tasks[TlID], {id:v1(), title, isDone:false}]})

        /* let task = {id: v1(), title: title, isDone: false};
         let newTasks = [task, ...tasks];
         setTasks(newTasks);*/
    }

    function changeStatus(taskId: string, isDone: boolean, TlID: string) {
        setTasks({...tasks, [TlID]:[...tasks[TlID].map(t=>t.id===taskId ? {...t, isDone} : t )]})

        /*let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);*/
    }

    function changeFilter(value: FilterValuesType, TlID: string) {

        setTodolists(todolists.map(tl => tl.id === TlID ? {...tl, filter: value } : tl ))

        /*setFilter(value);*/
    }




    return (

        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return <Todolist key={tl.id}
                                     TlID={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
