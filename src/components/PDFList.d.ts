import React = require("react");
import IPDFList from "../models/PDFList.model";
interface PDFLists {
    lists: IPDFList[];
}
declare const PDFList: React.FC<PDFLists>;
export default PDFList;
