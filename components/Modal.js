import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/Modal.module.css'

export default function Modal({ show, onClose, children }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);

    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleCloseClick}>
                        X
                    </a>
                </div>
                <div>{children}</div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root"),
        );
    } else {
        return null;
    }
};
