import * as React from "react";
import { useEffect, useState } from "react";
import appAPIService from "../api.service";

import { IMainData } from "../models/PDFList.model";
import "./../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css";
import "./App.scss";
import CategoryList from "./CategoryList";

export default function AppLayout() {
  const [apiData, setapiData] = useState<IMainData[]>([]);
  const [isApiError, setApiError] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeStyle, setActiveStyle] = useState(null);
  const [filteredCategoryList, setFilteredCategoryList] = useState<IMainData[]>(
    []
  );
  const [categoryName, setCategoryName] = useState<string>("");

  async function getAllLocalData(): Promise<void> {
    const data = await appAPIService.fetchMyLocalAPI();
    setapiData(data);
    mapCatgoryTitleList(data);
  }

  function mapCatgoryTitleList(data: IMainData[]): void {
    let categoriesTitles = data?.map((d) => d.Category);
    categoriesTitles = categoriesTitles.filter(onlyUnique);
    categoriesTitles = categoriesTitles.filter(Boolean);
    setCategories(categoriesTitles);
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async function getProductionData(): Promise<void> {
    const data = await appAPIService.getData();
    setapiData(data);
    mapCatgoryTitleList(data);
  }

  useEffect(() => {
    getAllLocalData();
    // getProductionData();
  }, []);
  useEffect(() => {}, [categories]);

  const selectCategory = (category: string) => {
    let filteredData = apiData.filter((val, index, data) => {
      if (val.Category === category) {
        return val.Category;
      }
    });

    setActiveStyle(category);

    setFilteredCategoryList(filteredData);
    setCategoryName(category);
  };

  const filterCategoryTitle = (e) => {
    const keyword = e.target.value;
    let allCategiries = [...categories];

    if (keyword) {
      const results = allCategiries.filter((catTitle) => {
        return catTitle?.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      setCategories(results);
    } else {
      mapCatgoryTitleList(apiData);
    }
    setCategoryName(keyword);
  };

  return (
    <div className="container">
      <h1 className="main-title">Business Operation Process Manual (BOPM)</h1>
      <div className="main-layout">
        <div className="sidebar">
          <h2>Table of Contents</h2>
          <div className="search-bar">
            <input
              type="text"
              value={categoryName}
              onChange={filterCategoryTitle}
              placeholder="Search..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="search-icon"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>

          <ul>
            {categories &&
              categories.map((categorie) => {
                return (
                  <li
                    key={categorie}
                    onClick={() => selectCategory(categorie)}
                    className={`${activeStyle === categorie ? "active" : ""}`}
                  >
                    {categorie}
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="main">
          <CategoryList
            lists={filteredCategoryList}
            categoryName={categoryName}
          />
          {isApiError && (
            <h3 style={{ color: "red", textAlign: "center" }}>
              Fetch API not working , dummy data showing..{" "}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
