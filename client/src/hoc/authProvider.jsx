import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  async function get() {
    try {
      const token = JSON.parse(localStorage.setItem("auth"));
      if (token) {
        const userData = await axios
          .get("http://localhost:2002/user/v2", {
            params: { token },
          })
          .then((res) => res.data);
        console.log(userData);
        if (userData) {
          dispatch({
            type: "login",
            payload: userData,
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return children;
}
