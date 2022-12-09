import React = require("react");
import { IMainData } from "../models/PDFList.model";

interface PDFLists {
  lists: IMainData[];
}

export default function PDFList({ lists }: PDFLists) {
  return (
    <div className="grid">
      {lists?.map((list, i) => {
        return (
          // <PDFListItem
          //   key={i}
          //   Title={list.Title}
          //   Process_Name={list.Process_Name}
          //   Doc_Link={list.Doc_Link}
          //   Category={list.Category}
          //   ID={list.ID}
          // />
          <p>Nothing</p>
        );
      })}
    </div>
  );
}
