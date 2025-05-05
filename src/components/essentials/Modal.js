import React, { useEffect } from 'react';
import './styles/Modal.css';

export default function Modal({
                                  show,
                                  onClose,
                                  title,
                                  children,
                                  footer,
                                  ariaLabelledBy,
                              }) {
    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [show]);

    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby={ariaLabelledBy}
                onClick={e => e.stopPropagation()}
            >
                {title && (
                    <header className="modal-header">
                        <h2 id={ariaLabelledBy}>{title}</h2>
                    </header>
                )}
                <div className="modal-body">
                    {children}
                </div>
                {footer && (
                    <footer className="modal-footer">
                        {footer}
                    </footer>
                )}
            </div>
        </div>
    );
}