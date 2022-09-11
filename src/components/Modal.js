import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

const Portal = ({ elementID = "modal", children }) => {
  const element = useMemo(() => document.createElement("div"), []);
  const rootEl = useMemo(() => document.getElementById(elementID), [elementID]);

  useEffect(() => {
    rootEl.appendChild(element);
    return () => {
      rootEl.removeChild(element);
    };
  }, [element, rootEl]);

  return ReactDOM.createPortal(children, element);
};

export const Modal = ({ children, toggle, open }) => (
  <Portal>
    {open && (
      <div className="p-0 m-0 absolute inset-0 flex flex-col justify-center items-center bg-black/90 ">
        <div className="relative shadow bg-white rounded-lg w-1/2 h-min overflow-y-auto">
          <div
            className="absolute top-3 right-4 cursor-pointer p-2"
            onClick={toggle}
          >
            X
          </div>
          {children}
        </div>
      </div>
    )}
  </Portal>
);
export default Modal;
