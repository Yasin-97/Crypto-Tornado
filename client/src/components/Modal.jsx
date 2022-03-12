import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import {WarningOutlined} from 'assets/icons'
export default function Modal({
  show,
  close,
  title,
  children,
  actionText,
  action,
}) {

  const [container]=useState(document.createElement('div'))
  const theme=useSelector((state)=>state.themeApi.theme)

  useEffect(()=>{
document.body.appendChild(container)

return()=>{
  document.body.removeChild(container)
}
  },[container])

  return ReactDOM.createPortal(
    <>
     {show ? (
        <div className={`modalContainer ${theme}`} onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h2 className="modal-header-title"><WarningOutlined /> ATTENTION</h2>
            </header>
            <main className="modal-content">
              <h2 >{children}</h2>
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
container
  )
}
