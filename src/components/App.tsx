import * as React from 'react';
import { useEffect, useState } from 'react';
import appAPIService from '../api.service';

import { Data } from '../data/PDFListData';
import IPDFList from '../models/PDFList.model';
import './../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './App.scss';
import PDFList from './PDFList';

export default function App() {
  const [apiData, setapiData] = useState<IPDFList[]>([])
  const [isApiError, setApiError] = useState<boolean>(false)
  const tsData: IPDFList[] = Data;
  async function fetchMyAPI(): Promise<void> {
    const data = await appAPIService.fetchMyLocalAPI();
    setapiData(data);
    console.log(data);
  }
  async function fetchMyPDF(): Promise<void>{
   const data = await appAPIService.getData();
   console.log(data);
  }
  useEffect(() => {
    fetchMyAPI()
    fetchMyPDF();
  }, [])

  return (

    <div className="small-space ">
      <div className='container'>
        <h1 className='main-title'>PDF Reader with Searching and Navigating</h1>
        {isApiError && <h3 style={{ color: 'red', textAlign: 'center' }}>Fetch API not working , dummy data showing.. </h3>}
        <PDFList lists={apiData} />
      </div>
    </div>
  );
}
