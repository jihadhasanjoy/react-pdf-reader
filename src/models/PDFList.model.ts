interface IDoc_Link {
  Description: string;
  Url: string;
}

export interface IMainData {
  Title: string;
  Process_Name: string;
  Doc_Link: IDoc_Link;
  Pdf_Link: string;
  Category: string;
  ID: number;
}
