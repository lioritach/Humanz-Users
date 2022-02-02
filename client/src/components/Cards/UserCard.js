import React from "react";
import { useDispatch } from "react-redux";
import "./UserCard.css";
import { BsTelephone } from "react-icons/bs";
import { MdPermIdentity } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TiLocationArrowOutline } from "react-icons/ti";
import { GiModernCity } from "react-icons/gi";
import { deleteUser } from "../../redux/features/userSlice";
import { useFetchIP } from "../../hooks/useFetchIP";
import axios from "axios";

const UserCard = ({ name, phone, id, ip }) => {
  const dispatch = useDispatch();
  useFetchIP(id, ip);
  const fetchedIp = JSON.parse(localStorage.getItem("fetchedIp"));

  const handleDeleteUser = async (id) => {
    dispatch(deleteUser(id));

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
    } catch (err) {}
  };

  console.log(fetchedIp);

  return (
    <div className="card_item">
      <div className="card_inner">
        <div className="name">{name}</div>
        <div className="userDetails">
          <div className="details">
            <span>
              <BsTelephone /> {phone}
            </span>
          </div>
          <div className="details">
            <span>
              <MdPermIdentity /> {id}
            </span>
          </div>
          <div className="details">
            <span>
              <HiOutlineLocationMarker /> {ip}
            </span>
            {fetchedIp.map((user) => (
              <span>
                {user.query === ip ? (
                  <>
                    <span>
                      <TiLocationArrowOutline /> {user.country}
                    </span>
                    <br />
                    <span>
                      <GiModernCity /> {user.city}
                    </span>
                    <br />
                  </>
                ) : null}
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => handleDeleteUser(id)} className="deleteBtn">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default UserCard;
