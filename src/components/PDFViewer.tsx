import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin } from "@react-pdf-viewer/search";
import { workerUrl } from "../config";
import React = require("react");

interface IPDFViewrProps {
  url: string;
}

export default function PDFViewer({ url }: IPDFViewrProps): JSX.Element {
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

  return (
    <>
      {
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
                fileUrl={url}
                initialPage={initialPage}
                onPageChange={handlePageChange}
                plugins={[searchPluginInstance, pageNavigationPluginInstance]}
                defaultScale={1.5}
              />
            </div>
          </div>
        </Worker>
      }
    </>
  );
}
