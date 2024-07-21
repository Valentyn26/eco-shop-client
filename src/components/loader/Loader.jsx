import React from "react";

import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles["loader-body"]}>
                <div className={styles["loader-circle"]}></div>
                <div className={styles["loader-circle"]}></div>
                <div className={styles["loader-circle"]}></div>
            </div>
        </div>
    )
}

export default Loader;