import React from "react";
import ReactDOM from "react-dom";
export default function Modal({
  show,
  close,
  title,
  children,
  actionText,
  action,
}) {
  return ReactDOM.createPortal(
    <>
      {show ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h2 className="modal-header-title">{title}</h2>
            </header>
            <main className="modal-content">
              <h2>{children}</h2>
            </main>
            <footer className="modal-footer">
              <button className="modal-close" onClick={() => close()}>
                Cancel
              </button>

              <button className="action" onClick={action}>
                {actionText}
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
}
