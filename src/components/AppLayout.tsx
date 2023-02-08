import * as React from "react";
import { useEffect, useState } from "react";
import appAPIService from "../api.service";

import { IMainData } from "../models/PDFList.model";
import "./../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css";
import "./App.scss";
import CategoryList from "./CategoryList";

export default function AppLayout() {
  const [apiData, setApiData] = useState<IMainData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeStyle, setActiveStyle] = useState(null);
  const [filteredCategoryList, setFilteredCategoryList] = useState<IMainData[]>(
    []
  );
  const [categoryName, setCategoryName] = useState<string>("");

  async function getAllLocalData(): Promise<void> {
    const data = await appAPIService.fetchMyLocalAPI();
    setApiData(data);
    const catgoriesTitleList = mapCatgoryTitleList(data);
    if (catgoriesTitleList && catgoriesTitleList.length > 0) {
      document.getElementById(catgoriesTitleList[0])?.click();
    }
  }

  function mapCatgoryTitleList(data: IMainData[]): string[] {
    let categoriesTitles = data?.map((d) => d.Category);
    categoriesTitles = categoriesTitles.filter(onlyUnique);
    categoriesTitles = categoriesTitles.filter(Boolean);
    setCategories(categoriesTitles);
    return categoriesTitles;
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async function getProductionData(): Promise<void> {
    const data = await appAPIService.getData();
    setApiData(data);
    const catgoriesTitleList = mapCatgoryTitleList(data);
    if (catgoriesTitleList && catgoriesTitleList.length > 0) {
      document.getElementById(catgoriesTitleList[0])?.click();
    }
  }

  useEffect(() => {
    // getAllLocalData();
    getProductionData();
  }, []);
  useEffect(() => {}, [categories]);

  const selectCategory = (category: string) => {
    let filteredData = apiData.filter((val, index, data) => {
      if (val.Category === category) {
        return val.Category;
      }
    });

    setActiveStyle(category);
    console.log(filteredData, "f");
    setFilteredCategoryList(filteredData);
    setCategoryName(category);
  };

  // const filterCategoryTitle = (e) => {
  //   const keyword = e.target.value;
  //   let allCategiries = [...categories];

  //   if (keyword) {
  //     const results = allCategiries.filter((catTitle) => {
  //       return catTitle?.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
  //     });
  //     setCategories(results);
  //   } else {
  //     mapCatgoryTitleList(apiData);
  //   }
  //   setCategoryName(keyword);
  // };

  return (
    <div className="container app">
      {/* <h1 className="main-title">Business Operation Process Manual (BOPM)</h1> */}
      <div className="top-wrapper">
        <h2>Table of Contents</h2>
      </div>

      <div className="main-layout">
        <div className="sidebar">
          <ul id="categoryList">
            {categories &&
              categories.map((categorie) => {
                return (
                  <li
                    id={categorie}
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
        </div>
      </div>
    </div>
  );
}
