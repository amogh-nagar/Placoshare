import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import openSocket from "socket.io-client";
import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError, setError } =
    useHttpClient();
  const history = useHistory();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `https://placeoshare.herokuapp.com/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  useEffect(() => {
    const socket = openSocket("https://placeoshare.herokuapp.com", {
      transports: ["websocket"],
    });

    socket.on("places", async (data) => {
      const response = await fetch(
        `https://placeoshare.herokuapp.com/api/places/user/${userId}`
      );
      const responseData = await response.json();
      if (responseData.places && responseData.places.length >= 0) {
        let updatedplaces = [...responseData.places];

        if (data.action === "create") {
          if (userId === data.user.id) {
            updatedplaces.push(data.place);
          }
        } else if (data.action === "update") {
          const index = updatedplaces.find(
            (place) => place.id === data.place.id
          );
          updatedplaces[index] = data.place;
        } else if (data.action === "delete") {
          updatedplaces = updatedplaces.filter(
            (place) => place.id !== data.place.id
          );
        }
        setLoadedPlaces(updatedplaces);
      } else {
        setError("No place found for this user");
        setLoadedPlaces(null);
      }
    });
  }, []);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  const clear = () => {
    setError(null);
    history.push("/");
  };
  return (
    <>
      <ErrorModal error={error} onClear={clear} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
