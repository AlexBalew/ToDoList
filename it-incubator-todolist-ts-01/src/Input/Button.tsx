import React from "react";

type ButtonType = {
    name: string
    setName: (name: string) => void
    addTask: (name: string) => void
}

export const Button = (props: ButtonType) => {

    const addTask = () => {
        props.addTask(props.name)
        props.setName('')
    }

    return (
        <button onClick={addTask}> + </button>
    )
}