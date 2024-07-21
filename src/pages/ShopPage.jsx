import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";
import { observer } from "mobx-react-lite";

import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchTypes, deleteOneType } from "../http/productAPI";
import { fetchBasketProducts, deleteBasketProduct } from "../http/basketAPI";
import Pages from "../components/Pages";
import DeleteButton from "../components/UI/deleteButton/DeleteButton";
import Loader from "../components/loader/Loader";

const ShopPage = observer(() => {

    const { productStore, userStore } = useContext(Context);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTypes().then(data => productStore.setTypes(data));
        fetchProducts(productStore.selectedType.id, productStore.page, 3).then(data => {
            productStore.setProducts(data.rows);
            productStore.setTotalCount(data.count);
            setLoading(false);
        });
    }, [productStore.selectedType.id, productStore.page])

    // useEffect(() => {
    //     fetchBasketProducts(userStore.user.id).then(data => {
    //         let productsId = data.map(item => {
    //             if (!item.productId) {
    //                 deleteProduct(null, null, item.id);
    //             }
    //             return item.productId;
    //         });
    //         productStore.setBasketProducts(productStore.products.filter(item => productsId.some(value => value === item.id)));
    //         console.log(1);
    //     });
    // }, []);

    // function deleteProduct(basketId, productId, id) {
    //     deleteBasketProduct(basketId, productId, id).then(() => {
    //         productStore.setBasketProducts(productStore.basketProducts.filter(prod => prod.id !== productId));
    //     })
    // }

    function categoryHandler(obj) {
        productStore.setSelectedType(obj);
        productStore.setPage(1);
    }

    function deleteType(e, id) {
        e.stopPropagation();
        deleteOneType(id).then(() => productStore.setTypes(productStore.types.filter(type => type.id !== id)));
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <main className="main">
            <div className="main__container">
                <div className="main__shop shop">
                    <div className="shop__categories categories">
                        <Category onClick={() => categoryHandler({})} active={!productStore.selectedType.id}>All Category</Category>
                        {productStore.types.map((item =>
                            <Category key={item.id} onClick={() => categoryHandler(item)} active={item.id === productStore.selectedType.id}>
                                {item.name}
                                {userStore.user.role === "ADMIN" && <DeleteButton onClick={(e) => deleteType(e, item.id)} />}
                            </Category>
                        ))}
                    </div>
                    <div className="shop__products-box">
                        <div className="shop__products products">
                            {productStore.products.map((item =>
                                <ProductCard key={item.id} id={item.id} typeId={item.typeId} name={item.name} price={item.price} img={item.img}></ProductCard>
                            ))}
                        </div>
                        <Pages />
                    </div>
                </div>
            </div>
        </main>
    );
});

export default ShopPage;