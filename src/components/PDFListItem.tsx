import { useState } from "react";
import IPDFList from "../models/PDFList.model";
import Modal from "./Modal";
import React = require("react");

const PDFListItem: React.FC<IPDFList> = ({ title, name, tags, path, url, description }: IPDFList) => {

  const [showModal, setShowModal] = useState<boolean>(false)



  return (
    <>
      <div onClick={() => setShowModal(!showModal)} className='box' title="Click to details">
        <img src={require('./../images/pdf.png')} alt="pdf" className="w-12 mx-auto block mb-3" />
        <div className="f">
          <h6 className='text-xl mb-1'> {title} </h6>
          <p className="text-sm">{name}</p>
        </div>
      </div>
      {showModal ? <Modal modalShow={showModal} modalClose={() => setShowModal(false)} url={url} /> : null}
    </>
  )
}

export default PDFListItem