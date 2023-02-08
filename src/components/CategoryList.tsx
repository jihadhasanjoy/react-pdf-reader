import { useEffect } from "react";
import { IMainData } from "../models/PDFList.model";
import PDFListItem from "./PDFListItem";
import React = require("react");

interface ICategoryList {
  lists: IMainData[];
  categoryName: string;
}

export default function CategoryList({ lists, categoryName }: ICategoryList) {
  const [data, setData] = React.useState(lists);
  const [typedString, setTypedString] = React.useState("");

  useEffect(() => {
    setData(lists);
  }, [categoryName]);

  const filteredData = (e: any) => {
    const keyword: string = e.target.value;

    if (keyword) {
      const filteredData = lists.filter((item) => {
        return item.Title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      setData(filteredData);
    } else {
      setData(lists);
    }
    setTypedString(keyword);
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={typedString}
          onChange={filteredData}
          placeholder="Search..."
        />
        <svg fill="currentColor" viewBox="0 0 16 16" className="search-icon">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>

      <div className="category-list">
        <ul id="categories" className="category-list">
          {data.length ? (
            data.map((item) => {
              return (
                <li key={item.ID} className="d">
                  {/* <Link
                    to={`/${item.Doc_Link.Url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.Title}
                  </Link> */}
                  <PDFListItem data={item} />
                </li>
              );
            })
          ) : (
            <p>Not found </p>
          )}
        </ul>
      </div>
    </>
  );
}
