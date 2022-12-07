import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import appAPIService from "../api.service";
import { Data } from "../data/PDFListData";
import { IPDFData } from "../models/api.model";
import IPDFList, { IMainData } from "../models/PDFList.model";
import "./../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css";
import "./App.scss";
import CategoryList from "./CategoryList";

export default function App() {
  const [apiData, setapiData] = useState<IMainData[]>([]);
  const [isApiError, setApiError] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState<IMainData[]>(
    []
  );
  const [categoryName, setCategoryName] = useState<string>(null);

  const tsData: IPDFList[] = Data;

  async function fetchMyAPI(): Promise<void> {
    const data = await appAPIService.fetchMyLocalAPI();
    setapiData(data);
    let categoriesTitles = data.map((d) => d.Category);
    categoriesTitles = categoriesTitles.filter(onlyUnique);
    setCategories((prev) => [...prev, ...categoriesTitles]);
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async function fetchMyPDF(): Promise<void> {
    const items: IPDFData[] = await appAPIService.getData();
    console.log("items", items);
    const item: IPDFData = await appAPIService.getDataByID();
    console.log("item", item);
  }
  useEffect(() => {
    fetchMyAPI();
    // fetchMyPDF();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const selectCategory = (category: string) => {
    let filteredData = apiData.filter((val, index, data) => {
      if (val.Category === category) {
        return val.Category;
      }
    });

    setFilteredCategoryList(filteredData);
    setCategoryName(category);

    console.log(filteredData, "filteredData");
    console.log(category, "category");
  };

  return (
    <Router>
      <div className="container">
        <h1 className="main-title">PDF Reader with Searching and Navigating</h1>
        <div className="main-layout">
          <ul className="sidebar">
            {categories &&
              categories.map((categorie) => {
                return (
                  <li key={categorie} onClick={() => selectCategory(categorie)}>
                    {categorie}
                  </li>
                );
              })}
          </ul>
          <div className="main">
            <CategoryList
              lists={filteredCategoryList}
              categoryName={categoryName}
            />
            <Switch>
              {/* <Route exact path="/">
                <PDFList lists={apiData} />
              </Route> */}
              {/* <Route path="/categories/:category" component={CategoryList} /> */}
            </Switch>
            {isApiError && (
              <h3 style={{ color: "red", textAlign: "center" }}>
                Fetch API not working , dummy data showing..{" "}
              </h3>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}
