import "./result.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import MapComponent from "./MapComponent";



import useEffect from "react"
const Result = () => {
  const value = 12;

  return (
    <>
      <div className="result-main">

        <div className="map-container">
          <MapComponent/>
        </div>
        <div className="result-container">
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs
              value={0}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Day One" >

              </Tab>
              <Tab label="Day two" />
              <Tab label="Day three" />
              <Tab label="Day four" />
              <Tab label="Day five" />
              <Tab label="Day six" />
              <Tab label="Day seven" />
            </Tabs>
          </Box>
        </div>
      </div>
    </>
  )
}

export default Result