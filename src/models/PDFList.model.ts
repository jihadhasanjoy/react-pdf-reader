interface IPDFList {
  Title: string;
  Process_Name: string;
  Doc_Link: IDoc_Link;
  Category: string;
}

interface IDoc_Link {
  Description: string;
  Url: string;
}

export interface IMainData {
  Title: string;
  Process_Name: string;
  Doc_Link: IDoc_Link;
  Category: string;
}

export default IPDFList;
