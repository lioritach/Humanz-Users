import React from "react";
import { useSelector } from "react-redux";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useFilters } from "../../hooks/useFilters";
import { selectStatus, selectUsersData } from "../../redux/features/userSlice";
import UserCard from "../Cards/UserCard";
import FilteredUsers from "../FilteredUsers/FilteredUsers";
import "./Users.css";

const Users = () => {
  useFetchUsers();
  const usersData = useSelector(selectUsersData);
  const status = useSelector(selectStatus);
  const { filteredUsers, applyFilters } = useFilters(usersData);

  if (status === "idle" || status === "loading") {
    return <div>Loading data ...</div>;
  }

  if (status === "success" && usersData?.length) {
    return (
      <div className="rootContainer">
        <FilteredUsers applyFilters={applyFilters} />
        <div className="userContainer">
          {filteredUsers?.length ? (
            filteredUsers?.map((user) => <UserCard key={user?.id} {...user} />)
          ) : (
            <h3>No results</h3>
          )}
        </div>
      </div>
    );
  }

  return <h2>No users found</h2>;
};

export default Users;
