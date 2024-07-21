import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { redirect } from "react-router-dom";

import AuthPage from './pages/AuthPage';
import NavBar from './pages/NavBar';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import ErrorPage from './pages/ErrorPage';

import "./styles/index.css";

import { Context } from './context/context';
import { observer } from 'mobx-react-lite';
import { check } from './http/userAPI';
import Loader from './components/loader/Loader';
import { deleteBasketProduct, fetchBasketProducts } from './http/basketAPI';
import { fetchProducts, fetchTypes } from './http/productAPI';

const App = observer(() => {

    const { userStore, productStore } = useContext(Context);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            check().then(user => {
                userStore.setUser(user);
                userStore.setIsAuth(true);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    setLoading(false);
                }
            })
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTypes().then(data => productStore.setTypes(data));
        fetchProducts(productStore.selectedType.id, productStore.page, 3).then(data => {
            productStore.setProducts(data.rows);
            productStore.setTotalCount(data.count);
        });

        if (userStore.user.id) {
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
            });
        }
    }, [userStore.user]);

    function deleteProduct(basketId, productId, id) {
        deleteBasketProduct(basketId, productId, id).then(() => {
            productStore.setBasketProducts(productStore.basketProducts.filter(prod => prod.id !== productId));
        })
    }

    function redirectLoader() {
        if (userStore.isAuth) {
            return redirect("/");
        } else {
            return redirect("/login");
        }
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    const router = createBrowserRouter(
        userStore.isAuth
            ?
            [{
                path: "/",
                element: <NavBar />,
                children: [
                    { path: "/", element: <ShopPage /> },
                    { path: "/admin", element: <AdminPage /> },
                    { path: "/cart", element: <CartPage /> },
                    { path: "/login", element: <ErrorPage />, loader: redirectLoader },
                    { path: "/registration", element: <ErrorPage />, loader: redirectLoader },
                    { path: "*", element: <ErrorPage /> },
                ]
            }]
            :
            [{ path: '/login', element: <AuthPage isReg={false} /> },
            { path: '/registration', element: <AuthPage isReg={true} /> },
            { path: '*', element: <AuthPage />, loader: redirectLoader },]
    );

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
})

export default App;