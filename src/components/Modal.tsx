import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import PDFViewer from "./PDFViewer";
import React = require("react");
interface IModalProps {
  onHideModal?: () => void;
  url: string;
  modalShow: boolean;
  modalClose: any;
}

export default function Modal({
  modalShow,
  url,
  modalClose,
}: IModalProps): JSX.Element {
  const modal = document.getElementById("categories");
  const buttons: any = modal?.getElementsByTagName("button");

  console.log(buttons, "call from prevent default");

  if (buttons) {
    let arr = Array.from(buttons);
    console.log(arr, "buttons have");
    arr?.map((d: HTMLButtonElement) => {
      d.addEventListener("click", (e) => {
        console.log("prevent default");
        e.preventDefault();
      });
    });
  }

  return (
    <>
      {
        <div id="modal" className="modal">
          <button onClick={modalClose} className="modal-close">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="modal-content">
            <PDFViewer url={url} />
          </div>
        </div>
      }
    </>
  );
}
