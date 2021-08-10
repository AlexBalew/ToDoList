import React from "react";

type ButtonType = {
    name: string
    setName: (name: string) => void
    addTask: (name: string) => void
    setError: (error: string | null) => void
}

export const Button = (props: ButtonType) => {

    const addTask = () => {
        const trimmedTitle = props.name.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
            props.setName('')
        } else {
            props.setError('Field is required');
        }
    }

    return (
        <button onClick={addTask}> + </button>
    )
}