import React, {ChangeEvent, KeyboardEvent} from "react";


export type InputType = {
    addTask: (name: string) => void
    name: string
    setName: (name: string) => void
    error: string | null
    setError: (error: string | null) => void
}

export const Input = (props: InputType) => {

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        props.setName(e.currentTarget.value)
    }

    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null)
        if (event.key === "Enter") {
            props.addTask(props.name)
            props.setName('')
        }
    }

    return (
        <div><input className={props.error ? 'error' : ''}
                    value={props.name}
                    placeholder='type smth'
                    onChange={changeName}
                    onKeyPress={onKeyPressAddTask}
        /></div>
    )
}

