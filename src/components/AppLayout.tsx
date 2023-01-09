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
  const [categoryName, setCategoryName] = useState<string>(null);

  async function getAllLocalData(): Promise<void> {
    const data = await appAPIService.fetchMyLocalAPI();
    setapiData(data);
    let categoriesTitles = data.map((d) => d.Category);
    categoriesTitles = categoriesTitles.filter(onlyUnique);
    setCategories((prev) => [...prev, ...categoriesTitles]);
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async function getProductionData(): Promise<void> {
    const items: IMainData[] = await appAPIService.getData();
    setapiData(items);
    let categoriesTitles = items.map((d) => d.Category);
    categoriesTitles = categoriesTitles.filter(onlyUnique);
    setCategories((prev) => [...prev, ...categoriesTitles]);
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

  return (
    <div className="container">
      <h1 className="main-title">UCBL Data Reader</h1>
      <div className="main-layout">
        <div className="sidebar">
          <h2>Categories</h2>
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
