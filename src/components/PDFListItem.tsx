import { useState } from "react";
import { IMainData } from "../models/PDFList.model";
import Modal from "./Modal";
import React = require("react");

interface IProps {
  data: IMainData;
}

export default function PDFListItem({ data }: IProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const PDFURL = data.Pdf_Link || data?.Doc_Link?.Url;

  return (
    <>
      <div
        onClick={() => setShowModal(!showModal)}
        className="box"
        title="Click to details"
      >
        <div>
          <h6> {data.Title.slice(0, 130)}... </h6>
        </div>
      </div>
      {showModal ? (
        <Modal
          modalShow={showModal}
          modalClose={() => setShowModal(false)}
          url={data.Pdf_Link || data?.Doc_Link?.Url}
        />
      ) : null}
      {/* <PDFViewer url={PDFURL} /> */}
    </>
  );
}
