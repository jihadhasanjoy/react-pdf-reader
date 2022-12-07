import React = require("react");
import IPDFList from "../models/PDFList.model";
import PDFListItem from "./PDFListItem";

interface PDFLists {
  lists: IPDFList[];
}

export default function PDFList({ lists }: PDFLists) {
  return (
    <div className="grid">
      {lists?.map((list, i) => {
        return (
          <PDFListItem
            key={i}
            Title={list.Title}
            Process_Name={list.Process_Name}
            Doc_Link={list.Doc_Link}
            Category={list.Category}
          />
        );
      })}
    </div>
  );
}
