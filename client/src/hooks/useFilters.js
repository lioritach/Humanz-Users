import { useState } from "react";

export const useFilters = (users) => {
  const [filter, setFilter] = useState(null);
  let filteredUsers = users;

  const applyFilters = (state) => {
    setFilter(state);
  };

  if (filter && users.length) {
    filteredUsers = users.filter((user) => {
      if (
        filter.name &&
        !user.name.toLowerCase().includes(filter.name.toLowerCase())
      ) {
        return false;
      }

      if (filter.phone !== "" && user.phone.toLowerCase() !== filter.phone) {
        return false;
      }

      if (filter.id !== "" && user.id.toLowerCase() !== filter.id) {
        return false;
      }

      if (filter.ip !== "" && user.ip.toLowerCase() !== filter.ip) {
        return false;
      }

      return true;
    });
  }

  return {
    filteredUsers,
    applyFilters,
  };
};
