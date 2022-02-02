import axios from "axios";
import { useEffect } from "react";

export const useFetchIP = (id, ip) => {
  useEffect(() => {
    const fetchIP = async () => {
      //store ip, expiration, and fetchedIp to localstorage
      const localstorage_ip = JSON.parse(localStorage.getItem("allData"));
      const localstorage_expiration = localStorage.getItem("expiration");
      const fetchedIp = JSON.parse(localStorage.getItem("fetchedIp"));

      //for not fetch again and again
      if (
        fetchedIp &&
        localstorage_ip &&
        localstorage_expiration > Number(new Date())
      ) {
        return localstorage_ip;
      }

      try {
        // eslint-disable-next-line array-callback-return
        let allData = JSON.parse(localStorage.getItem("allData"));
        const expiration = Number(new Date()) + 3600 * 1000;
        let newData = { id: id, ip: ip };
        if (!allData) allData = [];
        localStorage.setItem("newData", JSON.stringify(newData));
        allData.push(newData);
        localStorage.setItem("allData", JSON.stringify(allData));
        localStorage.setItem("expiration", expiration);
      } catch (err) {}

      try {
        const users = JSON.parse(localStorage.getItem("allData"));
        users.map(async (user) => {
          const res = await axios.get(`http://ip-api.com/json/${user.ip}`);
          let fetchedData = JSON.parse(localStorage.getItem("fetchedIp"));
          if (!fetchedData) fetchedData = [];
          localStorage.setItem("newFetchedData", JSON.stringify(res.data));
          fetchedData.push(res.data);
          localStorage.setItem("fetchedIp", JSON.stringify(fetchedData));
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchIP();
  }, []);
};
