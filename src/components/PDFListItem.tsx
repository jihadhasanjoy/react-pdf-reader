import { useState } from "react";
import { IMainData } from "../models/PDFList.model";
import Modal from "./Modal";
import React = require("react");

interface IProps {
  data: IMainData;
}

export default function PDFListItem({ data }: IProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setShowModal(!showModal)}
        className="box"
        title="Click to details"
      >
        {/* <img src={pdfImageUrl} alt="pdf" className="w-12 mx-auto block mb-3" /> */}
        <div className="f">
          <h6 className="text-xl mb-1"> {data.Title} </h6>
        </div>
      </div>
      {showModal ? (
        <Modal
          modalShow={showModal}
          modalClose={() => setShowModal(false)}
          url={data.Doc_Link.Url}
        />
      ) : null}
    </>
  );
}
