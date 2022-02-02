import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUsers, setStatus } from "../redux/features/userSlice";

export const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setStatus("loading"));
      try {
        const res = await axios.get("http://localhost:5000/api/users/");
        dispatch(setStatus("success")); //store status to redux
        dispatch(getUsers(res.data)); //store data to redux
      } catch (err) {}
    };

    fetchUsers();
  }, []);
};
