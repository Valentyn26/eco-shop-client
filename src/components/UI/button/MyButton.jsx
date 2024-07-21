import React from "react";

import styles from "./MyButton.module.css";

const MyButton = (props) => {
    return (
        <button onClick={props.onClick} disabled={props.disabled} className={styles.btn} type={props.type}>{props.children}</button>
    )
}

export default MyButton;