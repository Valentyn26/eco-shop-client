import React from "react";
import styles from "./PageButton.module.css";

const PageButton = ({ active, onClick, children }) => {
    return (
        <button onClick={onClick} className={active ? styles.pageBtn + ' ' + styles.active : styles.pageBtn}>
            {children}
        </button>
    )
}

export default PageButton;