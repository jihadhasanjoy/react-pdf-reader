import { pdfListDataUrl, ucbFilePath } from "./config";

import { IMainData } from "./models/PDFList.model";
const headers = {
  accept: "application/json;odata=verbose",
  "content-Type": "application/json;odata=verbose",
};
const appAPIService = {
  getData: async (): Promise<IMainData[]> => {
    try {
      const url = ucbFilePath + "items";
      const response = await fetch(url, {
        headers,
      });
      const data: any = await response.json();
      console.log("data form", data);
      return data?.d?.results || [];
    } catch (error) {
      console.error("data form", error);
      return [];
    }
  },
  getDataByID: async (id = 1): Promise<IMainData> => {
    try {
      const url = ucbFilePath + `GetItemById(${id})`;
      const response = await fetch(url, {
        headers,
      });
      const data: any = await response.json();
      console.log("data form Id", data);
      return data?.d;
    } catch (error) {
      console.error("data form", error);
      return null;
    }
  },

  fetchMyLocalAPI: async (): Promise<IMainData[]> => {
    try {
      const response = await fetch(pdfListDataUrl);
      const data = await response.json();
      return data;
    } catch (err) {
      return [];
    }
  },
};

export default appAPIService;
