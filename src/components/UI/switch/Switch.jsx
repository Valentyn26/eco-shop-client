import React, { Children } from "react";

import styles from "./Switch.module.css";

const Switch = ({ children, checked, onClick }) => {
    return (
        <div className={styles.switch}>
            <input checked={checked} type="checkbox" name="switch" id="switch" />
            <label onClick={onClick} htmlFor="switch" className={styles.switch__label}>{children}</label>
        </div>
    )
}

export default Switch;