import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IMainData } from "../models/PDFList.model";
import React = require("react");

interface ICategoryList {
  lists: IMainData[];
  categoryName: string;
}

export default function CategoryList({ lists, categoryName }: ICategoryList) {
  useEffect(() => {
    console.log({ categoryName, lists }, "catecategoryName");
  }, [categoryName]);

  const openNewTab = (id: number) => {
    console.log("open new tab");
    // window.open(
    //   `http://localhost:8080/categories/${id}`,
    //   "_blank",
    //   "noopener,noreferrer"
    // );
  };
  return (
    <>
      <div className="category-list">
        {lists.length < 1 && (
          <div className="select-category">
            <p>Please select category</p>
          </div>
        )}
        {lists &&
          lists.map((category) => {
            return (
              <div key={category.ID} className="d">
                <p>
                  <Link
                    to={`/${category.ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {category.Title}
                  </Link>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
