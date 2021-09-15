import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/Modal.module.css'
import Link from 'next/link'

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
                    <Link href="#" onClick={handleCloseClick} passHref>
                        <a> X </a>
                    </Link>
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
