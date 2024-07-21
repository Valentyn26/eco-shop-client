import React, { useContext, useEffect, useState } from "react";

import { Context } from "../context/context";

import Counter from "../components/counter/Counter";
import MyButton from "../components/UI/button/MyButton";
import { createBasketProduct, deleteBasketProduct, fetchBasketProducts } from "../http/basketAPI";
import { observer } from "mobx-react-lite";
import Loader from "../components/loader/Loader";

const CartPage = observer(() => {

    const { userStore, productStore } = useContext(Context);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBasketProducts(userStore.user.id).then(data => {
            data.sort((a, b) => a.productId - b.productId);
            let productsId = data.map(item => {
                if (!item.productId) {
                    deleteProduct(null, null, item.id);
                }
                return item.productId;
            });
            productStore.setBasketProducts(productStore.products.filter(item => productsId.some(value => value === item.id)));
            productStore.setBasketProducts(productStore.basketProducts.map((item, index) => {
                item.count = data[index].count;
                return item;
            }));
            setLoading(false);
        });
    }, []);

    function deleteProduct(basketId, productId, id) {
        deleteBasketProduct(basketId, productId, id).then(() => {
            productStore.setBasketProducts(productStore.basketProducts.filter(prod => prod.id !== productId));
        })
    }

    function updateProduct(basketId, productId, count) {
        createBasketProduct(basketId, productId, count).then(() => {
            productStore.setBasketProducts(productStore.basketProducts.map(prod => {
                if (prod.id === productId) {
                    prod.count = count;
                    return prod;
                } else {
                    return prod;
                }
            }));
        })
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <main className="main">
            <div className="main__container">
                <div className="main__cart cart">
                    <div className="cart__title">My Shopping Cart</div>
                    <div className="cart__products-box products-box">
                        <div className="products-box__list products-list">
                            <div className="products-list__header">Product</div>
                            <div className="products-list__header">price</div>
                            <div className="products-list__header">Quantity</div>
                            <div className="products-list__header last-header">Subtotal</div>
                            {productStore.basketProducts.map((product) =>
                                <>
                                    <div className="products-list__product">
                                        <div className="products-list__image"><img src={process.env.REACT_APP_API_URL + product.img} alt="" /></div>
                                        <div className="products-list__name">{product.name}</div>
                                    </div>
                                    <div className="products-list__price">${product.price}</div>
                                    <div className="products-list__quantity"><Counter onChange={updateProduct} count={product.count} productId={product.id} /></div>
                                    <div className="products-list__subtotal">${product.price * product.count}</div>
                                    <div className="products-list__delete">
                                        <button onClick={() => deleteProduct(userStore.user.id, product.id, null)} className="products-list__delete-button"></button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="products-box__checkout checkout">
                            <div className="checkout__title">Cart Total</div>
                            <div className="checkout__property property">
                                <div className="property__name">Total:</div>
                                <div className="property__value">${productStore.basketProducts.reduce((sum, product) => sum + product.price * product.count, 0)}</div>
                            </div>
                            <MyButton>Proceed to checkout</MyButton>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
});

export default CartPage;