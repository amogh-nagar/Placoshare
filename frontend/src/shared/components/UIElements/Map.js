import React, { useRef, useEffect } from "react";
import "./Map.css";

const Mapw = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    const infowindow = new window.google.maps.InfoWindow({
      content: props.description,
    });
    const marker = new window.google.maps.Marker({
      position: center,
      map: map,
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Mapw;
