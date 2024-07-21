import React from "react";

import styles from "./MyInput.module.css";

const MyInput = (props) => {
    return (
        <div className={styles.myInputBox}>
            {props.children
                ?
                <>
                    <label htmlFor={props.id}>{props.children}</label>
                    <input id={props.id} onChange={props.onChange} value={props.value} onBlur={props.onBlur} className={styles.myInput} type={props.type} placeholder={props.placeholder} name={props.name} />
                </>
                :
                <input id={props.id} onChange={props.onChange} value={props.value} onBlur={props.onBlur} className={styles.myInput} type={props.type} placeholder={props.placeholder} name={props.name} />
            }
        </div>
    )
}

export default MyInput;