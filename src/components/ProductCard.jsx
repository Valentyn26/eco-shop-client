import React, { useState, useContext } from "react";

import { Context } from "../context/context";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

import "../styles/index.css";
import ProductModal from "./UI/modal/ProductModal";
import { createBasketProduct, fetchBasketProducts } from "../http/basketAPI";
import DeleteButton from "./UI/deleteButton/DeleteButton";
import { deleteOneProduct, fetchProducts, fetchTypes } from "../http/productAPI";
import { observer } from "mobx-react-lite";

const ProductCard = observer(({ id, typeId, name, price, img }) => {

    const { userStore, productStore } = useContext(Context);

    const [modalActive, setModalActive] = useState(false);

    function deleteProd(id, img) {
        deleteOneProduct(id, img).then(() => {
            productStore.setProducts(productStore.products.filter(prod => prod.id !== id));
            if (productStore.products.length === 0) {
                productStore.setPage(productStore.page - 1);
            }
        });
    }

    function create() {
        createBasketProduct(userStore.user.id, id, 1).then(() => {
            fetchBasketProducts(userStore.user.id).then(data => {
                productStore.setBasketProducts(productStore.products.filter(item => data.some(value => value.productId === item.id)));
            });
        })
    }

    return (
        <>
            <div className="products__item item-products">
                <div onClick={() => setModalActive(true)} className="item-products__image">
                    <img src={process.env.REACT_APP_API_URL + img} alt="" />
                </div>
                <div className="item-products__body">
                    <div className="item-products__info">
                        <div className="item-products__name">{name}</div>
                        <div className="item-products__price">${price}</div>
                    </div>
                    <button disabled={!!productStore.basketProducts.find(item => item.id === id)} onClick={(e) => create()} className={productStore.basketProducts.find(item => item.id === id) ? "item-products__cart active" : "item-products__cart"}><FontAwesomeIcon icon={faBasketShopping} /></button>
                </div>
                {userStore.user.role === "ADMIN" && <DeleteButton onClick={() => deleteProd(id, img)} />}
            </div>
            <ProductModal basketId={userStore.user.id} id={id} typeId={typeId} active={modalActive} setActive={setModalActive} />
        </>
    )
})

export default ProductCard;