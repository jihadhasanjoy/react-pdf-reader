import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin } from "@react-pdf-viewer/search";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import appAPIService from "../api.service";
import { workerUrl } from "../config";
import { IMainData } from "../models/PDFList.model";

export default function SingleData() {
  const searchPluginInstance = searchPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { ShowSearchPopoverButton } = searchPluginInstance;
  const handlePageChange = (e: any) => {
    localStorage.setItem("current-page", `${e.currentPage}`);
  };

  const {
    CurrentPageInput,
    GoToFirstPageButton,
    GoToLastPageButton,
    GoToNextPageButton,
    GoToPreviousPage,
  } = pageNavigationPluginInstance;
  const currentPage = localStorage.getItem("current-page");
  const initialPage = currentPage ? parseInt(currentPage, 10) : 0;

  const IDFromRouter = useLocation().pathname as string;
  const [singleData, setSingleData] = useState<IMainData>();
  const [allData, setAllData] = useState<IMainData[]>([]);

  async function getAllLocalData(): Promise<void> {
    const data = await appAPIService.fetchMyLocalAPI();
    setAllData((prev) => [...prev, ...data]);
    const slicedID = Number(IDFromRouter.slice(1));
    const findedData = data.find((prevData) => prevData.ID === slicedID);
    setSingleData(findedData);
  }

  async function getProductionData(): Promise<void> {
    const slicedID = Number(IDFromRouter.slice(1));
    const data: IMainData = await appAPIService.getDataByID(slicedID);

    setSingleData(data);
  }

  useEffect(() => {
    // getAllLocalData();
    getProductionData();
  }, []);

  return (
    <>
      {singleData && (
        <div className="modal-contentttttt">
          <Worker workerUrl={workerUrl}>
            <div className="rpv-core__viewer viewer-wrapper">
              <div className="top-bar">
                <div style={{ padding: "0px 2px" }}>
                  <ShowSearchPopoverButton />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <GoToFirstPageButton />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <GoToPreviousPage />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <CurrentPageInput />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <GoToNextPageButton />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <GoToLastPageButton />
                </div>
              </div>

              <div style={{ height: "720px" }}>
                <Viewer
                  // fileUrl={
                  //   "https://github.com/jihadhasanjoy/test-site-publish/blob/master/resources/Angular_Router_Crash_Course.pdf"
                  // }
                  fileUrl={singleData?.Doc_Link.Url}
                  initialPage={initialPage}
                  onPageChange={handlePageChange}
                  plugins={[searchPluginInstance, pageNavigationPluginInstance]}
                  defaultScale={1.5}
                />
              </div>
            </div>
          </Worker>
        </div>
      )}
    </>
  );
}
