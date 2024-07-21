import React, { useState } from "react";
import MyButton from "../components/UI/button/MyButton";

import { observer } from "mobx-react-lite";
import AddCategoryModal from "../components/UI/modal/AddCategoryModal";
import AddProductModal from "../components/UI/modal/AddProductModal";

const AdminPage = observer(() => {

    const [categoryModalActive, setCategoryModalActive] = useState(false);

    const [productModalActive, setProductModalActive] = useState(false);

    return (
        <div className="admin-panel">
            <MyButton onClick={() => setCategoryModalActive(true)}>Add category</MyButton>
            <AddCategoryModal active={categoryModalActive} setActive={setCategoryModalActive} />

            <MyButton onClick={() => setProductModalActive(true)}>Add product</MyButton>
            <AddProductModal active={productModalActive} setActive={setProductModalActive} />
        </div >
    )
})

export default AdminPage;