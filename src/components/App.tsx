import * as React from 'react';
import { useEffect, useState } from 'react';

import { Data } from '../data/PDFListData';
import IPDFList from '../models/PDFList.model';
import './../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './App.scss';
import PDFList from './PDFList';

function App() {
  const [apiData, setapiData] = useState<IPDFList[]>([])
  const tsData: IPDFList[] = Data;
  async function fetchMyAPI(): Promise<void> {
    const siteUrl = window?.location?.href + 'resources/pdf-file.json';
    try {
      const response = await fetch(siteUrl);
      const data = await response.json();
      setapiData(data)
    }
    catch (err) {
      setapiData(tsData)
    }

  }
  useEffect(() => {
    fetchMyAPI()
  }, [])

  return (

    <div className="small-space ">
      <div className='container'>
        <h1 className='main-title'>PDF Reader with Searching and Navigating</h1>
        <PDFList lists={apiData} />
      </div>
    </div>


  );
}

export default App;
