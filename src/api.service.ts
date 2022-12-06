import { pdfFilePath, pdfListDataUrl } from "./config";
import { IPDFData } from "./models/api.model";
import IPDFList from "./models/PDFList.model";
const headers ={
  "accept": "application/json;odata=verbose",
  "content-Type": "application/json;odata=verbose"
}
const appAPIService = {
  getData: async(): Promise<IPDFData[]> =>{
    try{
      const response = await fetch(pdfFilePath, {
        headers
      })
      const data:any = await response.json();
      console.log('data form', data);
      return data?.d?.results || [];
    }
    catch(error){
      console.error('data form', error);
      return []
    }
  },
  fetchMyLocalAPI: async (): Promise<IPDFList[]> => {
    try {
      const response = await fetch(pdfListDataUrl);
      const data = await response.json();
      return data;
    }
    catch (err) {
      return [];
    }

  }
}

export default appAPIService;
