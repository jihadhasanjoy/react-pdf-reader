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

  function addAttribute() {
    const searchInput = document.querySelector(".rpv-search-popover-input");
    searchInput?.setAttribute("placeholder", "Search...");
    searchInput?.addEventListener("keypress", function (event: any) {
      if (event.key === "Enter") {
        // alert(event.key + " " + event.which);
        event.preventDefault();
      }
    });
    console.log(searchInput, "searchInput");
    if (buttons) {
      for (let index = 0; index < buttons.length; index++) {
        buttons[index].setAttribute("type", "button");
      }
    }
  }

  return (
    <>
      {
        <div id="modal" onClick={() => addAttribute()} className="modal">
          <button onClick={modalClose} className="modal-close">
            {/* <svg
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
            </svg> */}
            Back
          </button>
          <div className="modal-content">
            <PDFViewer url={url} />
          </div>
        </div>
      }
    </>
  );
}
