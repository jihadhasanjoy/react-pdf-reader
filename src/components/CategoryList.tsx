import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IMainData } from "../models/PDFList.model";
import React = require("react");

interface ICategoryList {
  lists: IMainData[];
  categoryName: string;
}

export default function CategoryList({ lists, categoryName }: ICategoryList) {
  const [post, SetPost] = useState({});
  const { push } = useHistory();

  useEffect(() => {
    console.log(categoryName, "catecategoryName");
  }, []);

  return (
    <>
      <div className="d">
        <h4>Category</h4>
      </div>
    </>
  );
}
