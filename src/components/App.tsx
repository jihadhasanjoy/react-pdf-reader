import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import appAPIService from "../api.service";
import { Data } from "../data/PDFListData";
import { IPDFData } from "../models/api.model";
import IPDFList from "../models/PDFList.model";
import "./../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css";
import "./App.scss";
import CategoryList from "./CategoryList";
import PDFList from "./PDFList";

export default function App() {
  const [apiData, setapiData] = useState<IPDFList[]>([]);
  const [isApiError, setApiError] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const tsData: IPDFList[] = Data;

  async function fetchMyAPI(): Promise<void> {
    const data = await appAPIService.fetchMyLocalAPI();
    setapiData(data);
    let categoriesTitles = data.map((d) => d.Title);
    setCategories((prev) => [...prev, ...categoriesTitles]);
  }
  async function fetchMyPDF(): Promise<void> {
    const items: IPDFData[] = await appAPIService.getData();
    console.log('items', items);
    const item: IPDFData = await appAPIService.getDataByID();
    console.log('item', item);
  }
  useEffect(() => {
    fetchMyAPI();
    fetchMyPDF();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <Router>
      <div className="container">
        <h1 className="main-title">PDF Reader with Searching and Navigating</h1>
        <div className="main-layout">
          <ul className="sidebar">
            {categories &&
              categories.map((categorie) => {
                return (
                  <li key={categorie}>
                    <Link to={`/categories/${categorie}`}>{categorie}</Link>
                  </li>
                );
              })}
          </ul>
          <div className="main">
            <Switch>
              <Route exact path="/">
                <PDFList lists={apiData} />
              </Route>
              <Route path="/categories/:category" component={CategoryList} />
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
