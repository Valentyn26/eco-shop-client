import React, { forwardRef, useContext, useEffect, useState } from "react";

import styles from "./Counter.module.css";
import { Context } from "../../context/context";
import { observer } from "mobx-react-lite";

const Counter = forwardRef((props, ref) => {

    const { userStore } = useContext(Context);

    const [counter, setCounter] = useState(props.count || 1);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted && props.onChange) {
            props.onChange(userStore.user.id, props.productId, counter);
        } else {
            setIsMounted(true);
        }
    }, [counter]);

    function decrement() {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    }

    function increment() {
        if (counter < 25) {
            setCounter(counter + 1);
        }
    }

    return (
        <div className={styles.counter}>
            <div onClick={decrement} className={styles.counterButton}>–</div>
            <div ref={ref}>{counter}</div>
            <div onClick={increment} className={styles.counterButton}>+</div>
        </div>
    )
})

export default Counter;