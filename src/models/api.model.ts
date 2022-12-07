export interface IPDFData {
  Title: string;
  Process_Name: string;
  Doc_Link: IDoc_Link;
  Category: string;
}
interface IDoc_Link {
  Description: string;
  Url: string;
}
