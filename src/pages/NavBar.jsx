import React, { useState, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { Context } from "../context/context";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import "../styles/index.css";

import Modal from "../components/UI/modal/Modal";
import MyButton from "../components/UI/button/MyButton";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {

    const location = useLocation();
    const [modalActive, setModalActive] = useState(false);
    const { userStore, productStore } = useContext(Context);

    function logOut() {
        userStore.setUser({});
        userStore.setIsAuth(false);
        localStorage.removeItem('token');
    }

    return (
        <>
            <div className="header">
                <div className="header__container">
                    <Link to="/" className="header__logo">LOGO</Link>
                    <div className="header__info-box info-box">
                        {userStore.user.role === "ADMIN" && <Link to="/admin" className={location.pathname === "/admin" ? "header__admin-link active" : "header__admin-link"}>Admin Panel</Link>}
                        <Link to="/cart" className="info-box__cart">
                            <FontAwesomeIcon icon={faBasketShopping} />
                            {productStore.basketProducts.length
                                ? <span className="info-box__products-number">{productStore.basketProducts.length}</span>
                                : <></>
                            }
                        </Link>
                        <button onClick={() => setModalActive(true)} className="info-box__account"><FontAwesomeIcon icon={faUser} /></button>
                        <Modal active={modalActive} setActive={setModalActive}>
                            <div style={{ fontSize: "20px" }}>{userStore.user.email}</div>
                            <MyButton onClick={logOut}>Logout</MyButton>
                        </Modal>
                    </div>
                </div>
            </div>
            <Outlet />
        </>

    )
})

export default NavBar;