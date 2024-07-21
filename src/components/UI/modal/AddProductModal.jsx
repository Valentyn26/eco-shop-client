import React, { useState, useContext, useEffect } from "react";

import { Context } from "../../../context/context";

import styles from "./AddProductModal.module.css";

import Modal from "./Modal";
import { createProduct } from "../../../http/productAPI";
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";

const AddProductModal = ({ active, setActive }) => {

    const { productStore } = useContext(Context);

    const [productType, setProductType] = useState({});
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productFile, setProductFile] = useState(null);
    const [productInfo, setProductInfo] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    function addProduct(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', productName);
        formData.append('price', `${productPrice}`);
        formData.append('img', productFile);
        formData.append('typeId', productType.id);
        formData.append('info', productInfo);
        createProduct(formData).then(() => {
            setProductType({});
            setProductName('');
            setProductPrice(0);
            setProductFile(null);
            setProductInfo('');
            setActive(false);
        });
    }

    function typeHandler(e) {
        const name = e.target.value;
        if (name === "select") {
            setProductType({});
        } else {
            const type = productStore.types.filter((item) => item.name === name)[0];
            setProductType(type);
        }
    }

    useEffect(() => {
        if (Object.keys(productType).length && productName && productPrice && productFile && productInfo) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [productType, productName, productPrice, productFile, productInfo]);

    return (
        <Modal active={active} setActive={setActive}>
            <form onSubmit={addProduct}>
                <select value={productType.name || "select"} className={styles.categorySelect} onChange={typeHandler} name="type">
                    <option value="select">Select a category</option>
                    {productStore.types.map(item =>
                        <option key={item.id} value={item.name}>{item.name}</option>
                    )}
                </select>
                <span className="auth-form__error-message">*</span>

                <MyInput id="prodName" onChange={(e) => setProductName(e.target.value)} type="text" value={productName} placeholder="Enter name">
                    Product name
                    <span className="auth-form__error-message">*</span>
                </MyInput>
                <MyInput id="price" onChange={(e) => setProductPrice(Number(e.target.value))} type="number" value={productPrice} placeholder="Enter price">
                    Product price
                    <span className="auth-form__error-message">*</span>
                </MyInput>
                <MyInput id="image" onChange={(e) => setProductFile(e.target.files[0])} type="file" files={productFile}>
                    Product image
                    <span className="auth-form__error-message">*</span>
                </MyInput>

                <div className={styles.textBox}>
                    <label htmlFor="description">Product description<span className="auth-form__error-message">*</span></label>
                    <textarea id="description" onChange={(e) => setProductInfo(e.target.value)} name="info" rows="4" cols="40" value={productInfo}></textarea>
                </div>

                <MyButton disabled={!formIsValid} type="submit">Add product</MyButton>
            </form>
        </Modal>
    )
}

export default AddProductModal;