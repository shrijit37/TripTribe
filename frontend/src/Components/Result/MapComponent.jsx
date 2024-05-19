import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const mapContainerStyle = {
  height: '100vh',
  width: '100%'
};

const cities = {
  NewYork: { lat: 40.7128, lng: -74.0060 },
  LosAngeles: { lat: 34.0522, lng: -118.2437 },
  Chicago: { lat: 41.8781, lng: -87.6298 },
  Houston: { lat: 29.7604, lng: -95.3698 },
  Miami: { lat: 25.7617, lng: -80.1918 }
};

const MapComponent = () => {
  const hotel = useSelector(state => state.search.hotel);
  const center = {
    lat: hotel ? hotel.lat : 39.8283,
    lng: hotel ? hotel.lng : -98.5795
  };

  const mapRef = useRef();
  const [selectedCity, setSelectedCity] = useState(null);
  const [directions, setDirections] = useState(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: center,
        destination: cities[city],
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    mapRef.current.panTo(cities[city]);
    mapRef.current.setZoom(10);
  };

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API library must be loaded.");
    }
  }, []);

  return (
    <div>
      {/* <div>
        {Object.keys(cities).map(city => (
          <button key={city} onClick={() => handleCityClick(city)}>
            {city}
          </button>
        ))}
      </div> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={hotel ? 12 : 4}
        center={center}
        onLoad={onMapLoad}
      >
        {hotel && (
          <Marker
            position={center} 
          />
        )}
        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
