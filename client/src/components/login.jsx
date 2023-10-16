import { useNavigate } from "react-router-dom";
import pabrik from "../assets/factory.jpg";
import { useState } from "react";
import axios from "axios";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    usermail: "",
    password: "",
  });
  console.log(user);
  const nav = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:2002/user/v1", user);

      localStorage.setItem("auth", JSON.stringify(response.data.value));

      alert("login success");
      nav("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-slate-500 flex justify-center items-center">
        <div className="w-3/5 h-[500px] bg-white rounded-2xl flex p-5">
          <div className="w-2/5 h-full flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <div className="text-xl font-bold">Login</div>

              <div>
                <label>Email or Username</label>
                <div className="w-[260px]">
                  <Input
                    className=" rounded-sm h-[30px] w-4/5 border border-gray-600 p-1"
                    onChange={(e) => {
                      setUser({ ...user, usermail: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Password</label>
                <div className="w-[260px]">
                  <InputGroup>
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      className="rounded-sm h-[30px] w-4/5 border border-gray-600 p-1 bg-transparent"
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                    <InputRightElement>
                      <Icon
                        cursor={"pointer"}
                        as={isPasswordVisible ? FaEye : FaEyeSlash}
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      ></Icon>
                    </InputRightElement>
                  </InputGroup>
                </div>
              </div>
              <div>
                <button
                  className="p-1 rounded-md bg-slate-500 text-stone-50"
                  onClick={login}
                >
                  Login
                </button>

                <div className="text-xs pt-2">
                  Don't have an account?{" "}
                  <span
                    className="text-blue-600 font-bold"
                    onClick={() => nav("/register")}
                  >
                    Sign Up!
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5 h-full bg-black rounded-md">
            <img
              className="rounded-md w-full h-full object-cover"
              src={pabrik}
            />
          </div>
        </div>
      </div>
    </>
  );
}
