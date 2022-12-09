import { useEffect } from "react";
import { IMainData } from "../models/PDFList.model";
import React = require("react");

interface ICategoryList {
  lists: IMainData[];
  categoryName: string;
}

export default function CategoryList({ lists, categoryName }: ICategoryList) {
  useEffect(() => {}, [categoryName]);

  const openNewTab = (url: string) => {
    window.open(url, "_blank");
    console.log("open new tab");
  };
  return (
    <>
      <div className="category-list">
        {lists.length < 1 ? (
          <div className="select-category">
            <p>Please select category</p>
          </div>
        ) : (
          <p className="selected-items-title">Items of selected category</p>
        )}

        <ul className="category-list">
          {lists &&
            lists.map((category) => {
              return (
                <li
                  key={category.ID}
                  className="d"
                  onClick={() => openNewTab(category.Doc_Link.Url)}
                >
                  {category.Title}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
