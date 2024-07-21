import React, { useEffect, useState } from "react";

import "./Modal.css";

const Modal = ({ active, setActive, children }) => {

    const [clickedOnContent, setClickedOnContent] = useState(false);
    const [isVisible, setIsVisible] = useState(active);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsVisible(false);
                setTimeout(() => setActive(false), 200);
            }
        };

        if (active) {
            setIsVisible(true);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [active]);

    if (!active) {
        return null;
    }

    return (
        <div
            onMouseUp={() => {
                if (clickedOnContent) {
                    setClickedOnContent(false);
                } else {
                    setIsVisible(false);
                    setTimeout(() => setActive(false), 200);
                }
            }}
            className={isVisible ? "modal active" : "modal"}
        >
            <div onMouseDown={() => setClickedOnContent(true)} onMouseUp={(e) => {
                e.stopPropagation();
                setClickedOnContent(false);
            }} className={isVisible ? "modal__content active" : "modal__content"}>
                {children}
                <button onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => setActive(false), 200);
                }} className="modal__close-button"></button>
            </div>
        </div>
    )
}

export default Modal;