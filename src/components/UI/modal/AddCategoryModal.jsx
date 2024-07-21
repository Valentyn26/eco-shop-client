import React, { useState, useContext, useEffect } from "react";

import { Context } from "../../../context/context";

import Modal from "./Modal";
import { createType } from "../../../http/productAPI";
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import useInputValidation from "../../../hooks/useInputValidation";

const AddCategoryModal = ({ active, setActive }) => {

    const { productStore } = useContext(Context);

    const [category, setCategory, categoryIsUsed, categoryChangeHandler, categoryBlurHandler, categoryErrorMessage] = useInputValidation('');
    const [formIsValid, setFormIsValid] = useState(false);

    function addCategory(e) {
        e.preventDefault();
        createType(category).then(data => {
            setCategory('');
            setActive(false);
            productStore.setTypes([...productStore.types, data]);
        });
    }

    useEffect(() => {
        if (categoryErrorMessage) {
            setFormIsValid(false);
        } else {
            setFormIsValid(true);
        }
    }, [categoryErrorMessage]);

    return (
        <Modal active={active} setActive={setActive}>
            <form onSubmit={addCategory}>
                <MyInput id="catName" onChange={categoryChangeHandler} onBlur={categoryBlurHandler} type="text" value={category} placeholder="Enter name">Name of category {(categoryIsUsed && categoryErrorMessage) && <div className="auth-form__error-message">{categoryErrorMessage}</div>}</MyInput>
                <MyButton disabled={!formIsValid} type="submit">Add category</MyButton>
            </form>
        </Modal>
    )
}

export default AddCategoryModal;