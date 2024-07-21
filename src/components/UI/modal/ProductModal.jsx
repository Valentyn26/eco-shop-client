import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import MyButton from "../button/MyButton";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

import styles from "./ProductModal.module.css";
import { fetchOneProduct, fetchOneType } from "../../../http/productAPI";
import Counter from "../../counter/Counter";
import { createBasketProduct, fetchBasketProducts } from "../../../http/basketAPI";
import { Context } from "../../../context/context";

const ProductModal = ({ basketId, id, typeId, active, setActive }) => {

    const { productStore } = useContext(Context);

    const [product, setProduct] = useState({});
    const [category, setCategory] = useState('');

    const counter = useRef(null);

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
        fetchOneType(typeId).then(data => {
            setCategory(data.name)
        });
    }, []);

    function create() {
        setActive(false);
        createBasketProduct(basketId, id, Number(counter.current.innerHTML)).then(() => {
            fetchBasketProducts(basketId).then(data => {
                productStore.setBasketProducts(productStore.products.filter(item => data.some(value => value.productId === item.id)));
                productStore.setBasketProducts(productStore.basketProducts.map((item, index) => {
                    item.count = data[index].count;
                    return item;
                }));
            });
        })
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={styles.card}>
                <div className={styles.card__image}>
                    <img src={process.env.REACT_APP_API_URL + product.img} alt="" />
                </div>
                <div className={styles.info}>
                    <div className={styles.info__name}>{product.name}</div>
                    <div className={styles.info__price}>${product.price}</div>
                    <div className={styles.info__description}>{product.info || "No description"}</div>
                    <div className={styles.add}>
                        <Counter ref={counter} />
                        <MyButton disabled={!!productStore.basketProducts.find(item => item.id === id)} onClick={() => create()}><div className={styles.add__buttonText}>Add to Cart</div><FontAwesomeIcon icon={faBasketShopping} /></MyButton>
                    </div>
                    <div className={styles.info__category}><span>Category:</span> {category}</div>
                </div>
            </div>
        </Modal>
    )
}

export default ProductModal;