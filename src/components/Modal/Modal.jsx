import { useEffect } from 'react';
import css from "./Modal.module.css";

export const Modal = ({ onClose,  url  }) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    };

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return (
        <div className={css.overlay} onClick={handleBackdropClick}>
            <div className={css.modal}>
                {<img src={url}  className={css.photo_modal}
                    alt="" />}
            </div>
        </div>
    );
}

