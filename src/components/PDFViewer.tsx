import { RenderShowSearchPopoverProps, searchPlugin } from '@react-pdf-viewer/search';
import React = require('react');

const PDFViewer = () => {
  const fileUrl = "./recources/Angular_Router_Crash_Course.pdf";
  const searchPluginInstance = searchPlugin();
  const { ShowSearchPopover } = searchPluginInstance;

  return (
    <div
      className="rpv-core__viewer"
      style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#eeeeee',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          padding: '4px',
        }}
      >
        <ShowSearchPopover>
          {(props: RenderShowSearchPopoverProps) => (
            <button
              style={{
                backgroundColor: '#357edd',
                border: 'none',
                borderRadius: '4px',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '8px',
              }}
              onClick={props.onClick}
            >
              Search
            </button>
          )}
        </ShowSearchPopover>
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* <Viewer fileUrl={fileUrl} plugins={[searchPluginInstance]} /> */}
      </div>
    </div>
  );
}

export default PDFViewer