import { useState } from "react";
import { pdfImageUrl } from "../config";
import IPDFList from "../models/PDFList.model";
import Modal from "./Modal";
import React = require("react");
const PDFListItem: React.FC<IPDFList> = ({ name, path }: IPDFList) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <div onClick={() => setShowModal(!showModal)} className='box' title="Click to details">
        <img src={pdfImageUrl} alt="pdf" className="w-12 mx-auto block mb-3" />
        <div className="f">
          <h6 className='text-xl mb-1'> {name} </h6>
        </div>
      </div>
      {showModal ? <Modal modalShow={showModal} modalClose={() => setShowModal(false)} url={path} /> : null}
    </>
  )
}

export default PDFListItem