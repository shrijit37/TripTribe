import "./result.css"
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapComponent from './MapComponent';

const Result = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="result-main">
      <div className={`map-container ${currentTab === 0 ? 'tab-active' : ''}`}>
        <MapComponent />
      </div>
      <div className="result-container">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Day One" sx={{ color: '#000', bgcolor: '#fff' }} />
            <Tab label="Day Two" sx={{ color: '#000', bgcolor: '#fff' }} />
            <Tab label="Day Three" sx={{ color: '#000', bgcolor: '#fff' }} />
            <Tab label="Day Four" sx={{ color: '#000', bgcolor: '#fff' }} />
            <Tab label="Day Five" sx={{ color: '#000', bgcolor: '#fff' }} />
            <Tab label="Day Six" sx={{ color: '#000', bgcolor: '#fff' }} />
            <Tab label="Day Seven" sx={{ color: '#000', bgcolor: '#fff' }} />
          </Tabs>
        </Box>
        {/* Content for each tab */}
        {currentTab === 0 && <div className="tab-content">Content for Day One</div>}
        {currentTab === 1 && <div className="tab-content">Content for Day Two</div>}
        {currentTab === 2 && <div className="tab-content">Content for Day Three</div>}
        {currentTab === 3 && <div className="tab-content">Content for Day Four</div>}
        {currentTab === 4 && <div className="tab-content">Content for Day Five</div>}
        {currentTab === 5 && <div className="tab-content">Content for Day Six</div>}
        {currentTab === 6 && <div className="tab-content">Content for Day Seven</div>}
      </div>
    </div>
  );
};

export default Result;
