import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type propsType = {
    title: string,
    setTitle: (title: string) => void
    addTask: (title: string, todolistId: string) => void
    todolistId: string
    setError: (error: string | null) => void
    error: string | null
}


export const NewInput = (props: propsType) => {


    // const addTask = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(title.trim(), props.todolistId);
    //         setTitle('');
    //     } else {
    //         setError('Title is required');
    //     }
    // }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null);
        if (e.key === 'Enter' && props.title.trim() !== '') {
            props.addTask(props.title, props.todolistId);
            props.setTitle('')
        }
        if (e.key === 'Enter' && props.title.trim() === '') {
            props.setError("Field is required")
        }
    }

    return (
        <div>
            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={props.error ? 'error' : ''}
            />
            {/*<button onClick={addTask}>+</button>*/}
            {props.error && <div className="error-message">{props.error}</div>}
        </div>
    )
}