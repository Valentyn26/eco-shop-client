import React, { useContext } from "react";

import styles from "./DeleteButton.module.css";

const DeleteButton = ({ onClick }) => {

    return (
        <div onClick={onClick} className={styles.deleteBtn}></div>
    )
}

export default DeleteButton;