import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IMainData } from "../models/PDFList.model";
import React = require("react");

interface ICategoryList {
  lists: IMainData[];
  categoryName: string;
}

export default function CategoryList({ lists, categoryName }: ICategoryList) {
  useEffect(() => {}, [categoryName]);

  const openNewTab = (id: number) => {
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
                <li key={category.ID} className="d">
                  <Link
                    to={`/${category.ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {category.Title}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
