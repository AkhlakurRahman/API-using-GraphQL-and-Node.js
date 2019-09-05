import React from 'react';

import './Modal.css';

const Modal = ({
  title,
  children,
  canCancel,
  canConfirm,
  handleConfirm,
  handleCancelingBackdrop
}) => {
  return (
    <div className="modal-control">
      <div className="modal-guts">
        <header className="modal__header">
          <h1>{title}</h1>
        </header>
        <section className="modal__content">{children}</section>
        <section className="modal__action">
          {canCancel && (
            <button className="btn" onClick={handleCancelingBackdrop}>
              Cancel
            </button>
          )}
          {canConfirm && (
            <button className="btn" onClick={handleConfirm}>
              Confirm
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default Modal;
