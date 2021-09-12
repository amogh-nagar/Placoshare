import React, { useRef, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";

const mapstyles = {
  width: "100%",
  height: "100%",
};

const Mapw = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;
console.log(center);
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    console.log(map);
    new window.google.maps.Marker({
      position:center,
      map: map,
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
    // <Map zoom={14} styles={mapstyles} initialCenter={center} />
  );
};

export default Mapw;
