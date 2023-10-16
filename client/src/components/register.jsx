import { useState } from "react";
import pabrik from "../assets/factory.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  console.log(user);
  const nav = useNavigate();
  const register = async () => {
    try {
      await axios.post("http://localhost:2002/user/", user);
      alert("register Success");
      nav("/login");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-slate-500 flex justify-center items-center">
        <div className="w-3/5 h-[500px] bg-white rounded-2xl flex p-5">
          <div className="w-2/5 h-full flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <div className="text-xl font-bold">Register</div>
              <div>
                <label>Full Name</label>
                <div className="w-[260px]">
                  <Input
                    className=" rounded-sm h-[30px] w-4/5 border border-gray-600 p-1"
                    onChange={(e) => {
                      setUser({ ...user, fullname: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Username</label>
                <div className="w-[260px]">
                  <Input
                    className=" rounded-sm h-[30px] w-4/5 border border-gray-600 p-1"
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Email</label>
                <div className="w-[260px]">
                  <Input
                    className=" rounded-sm h-[30px] w-4/5 border border-gray-600 p-1"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
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
                      className=" rounded-sm h-[30px] w-4/5 border border-gray-600 p-1"
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
                  onClick={register}
                >
                  Register
                </button>
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
