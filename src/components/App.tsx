import * as React from 'react';

import { Data } from '../data/PDFListData';
import IPDFList from '../models/PDFList.model';
import './../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './App.scss';
import PDFList from './PDFList';

function App() {
  const data: IPDFList[] = Data;
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // const fileUrl = "/recources/Angular_Router_Crash_Course.pdf";
  // const searchPluginInstance = searchPlugin();
  // const { ShowSearchPopoverButton } = searchPluginInstance;

  React.useEffect(() => {
    // document.onkeydown = function (e) {
    //   // if (e.ctrlKey || e.altKey) {
    //   //   return false;
    //   // }
    // };

    // window.addEventListener('contextmenu', function (e) {
    //   e.preventDefault();
    // }, false);
  }, [])

  return (

    <div className="small-space ">
      <div className='container'>
        <h1 className='main-title'>PDF Reader with Searching and Navigating</h1>
        <PDFList lists={data} />
        {/* <TestViewer /> */}
      </div>
    </div>


  );
}

export default App;
