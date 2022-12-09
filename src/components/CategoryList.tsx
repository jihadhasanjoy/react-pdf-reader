import { useEffect } from "react";
import { IMainData } from "../models/PDFList.model";
import PDFListItem from "./PDFListItem";
import React = require("react");

interface ICategoryList {
  lists: IMainData[];
  categoryName: string;
}

export default function CategoryList({ lists, categoryName }: ICategoryList) {
  useEffect(() => {}, [categoryName]);

  const openNewTab = (url: string) => {
    window.open("", "_blank");
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
          <p className="selected-items-title">Data of selected category</p>
        )}

        <ul className="category-list">
          {lists &&
            lists.map((category) => {
              return (
                <li key={category.ID} className="d">
                  {/* <Link
                    to={`/${category.Doc_Link.Url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {category.Title}
                  </Link> */}
                  <PDFListItem data={category} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
