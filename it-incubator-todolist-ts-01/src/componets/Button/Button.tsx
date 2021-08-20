import React from 'react';
import {FilterValuesType} from '../../App';
import style from './Button.module.css'

type ButtonType = {
    name: string
    callback: () => void
    filter?: FilterValuesType
}

export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callback()
    }

    return (
        <button className={props.filter === props.name ? style.activeFilter : ''}
                onClick={onClickHandler}>{props.name.toUpperCase()}</button>
    )
}

