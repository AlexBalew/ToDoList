import React from "react";
import {FilterValuesType} from "../../App";
import style from './UniversalButton.module.css'

export type UniversalButtonPropsType = {
    filter?: FilterValuesType
    title: string
    callback: () => void
    TlID?: string
}


export const UniversalButton = (props: UniversalButtonPropsType ) => {

    const onClickHandler = () => {props.callback()}

    return (

        <button className={props.filter === props.title ? style.activeFilter : ""}
                onClick={onClickHandler}>{props.title}</button>

    )
}