import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseData.users);
        console.log("response", responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  useEffect(() => {
    const socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });

    socket.on("places", async (data) => {
      console.log("data ", data);
      if (data.action === "create") {
        console.log("inside", loadedUsers);

        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();
        const updateduser = [...responseData.users];

        const updateduserindex = updateduser.findIndex(
          (user) => user.id === data.user.id
        );

        if (updateduserindex >= 0) {
          updateduser[updateduserindex].places.push(data.place);
        }
        setLoadedUsers(updateduser);
      }
    });

  }, []);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
