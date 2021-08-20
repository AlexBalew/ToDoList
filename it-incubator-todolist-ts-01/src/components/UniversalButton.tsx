import React from "react";
import {FilterValuesType} from "../App";
import style from './UniversalButton.module.css'

export type UniversalButtonPropsType = {
    filter: FilterValuesType
    title: FilterValuesType
    callback: (filter: FilterValuesType, TlID: string) => void
    TlID: string
}


export const UniversalButton = (props: UniversalButtonPropsType ) => {

    const onClickHandler = () => {props.callback(props.title, props.TlID)}

    return (

        <button className={props.filter === props.title ? style.activeFilter : ""} onClick={onClickHandler}>{props.title}</button>
    )
}