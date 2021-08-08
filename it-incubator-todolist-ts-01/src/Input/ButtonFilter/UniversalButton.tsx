import React from "react";


export type propsButtonType = {
    callBack: () => void
   title: string
}

export const UniversalButton = (props: propsButtonType) => {

    const AllFilter = () => {
        props.callBack()
    }

    return (
        <button onClick={AllFilter}>{props.title}</button>
    )
}