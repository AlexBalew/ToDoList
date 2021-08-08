import React, {ChangeEvent, KeyboardEvent} from "react";

export type InputType = {
    addTask: (name: string) => void
    name: string
    setName: (name: string) => void
}

export const Input = (props: InputType) => {

    const changeName = (e: ChangeEvent<HTMLInputElement>) => props.setName(e.currentTarget.value)

    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.addTask(props.name)
            props.setName('')
        }
    }

    return (
        <div><input value={props.name}
                    placeholder='type smth'
                    onChange={changeName}
                    onKeyPress={onKeyPressAddTask}

        /></div>
    )
}

