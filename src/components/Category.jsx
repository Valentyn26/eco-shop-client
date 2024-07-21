import React from "react";

import "../styles/index.css";
import DeleteButton from "./UI/deleteButton/DeleteButton";

const Category = ({ children, onClick, active }) => {
    return (
        <button onClick={onClick} className={active ? "categories__item active" : "categories__item"}>
            {children}
        </button>
    )
}

export default Category;