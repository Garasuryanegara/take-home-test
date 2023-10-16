import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth"));
  const logout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };
  return (
    <>
      <div className="w-full h-14 bg-slate-400 flex justify-between items-center p-3 px-16 text-lg font-semibold sticky top-0">
        <div>LOGO</div>
        <div className="flex gap-3 cursor-pointer">
          {user?.fullname ? (
            <div className="flex gap-3 cursor-pointer">
              <div>Hello, {user.fullname} ! </div>
              <div
                className="flex justify-center items-center gap-1  text-red-700"
                onClick={logout}
              >
                <div className="text-xs flex items-center"> Logout</div>
                <RiLogoutCircleRLine />
              </div>
            </div>
          ) : (
            <div>
              <span onClick={() => nav("/login")}>Masuk</span> |{" "}
              <span onClick={() => nav("/register")}>Daftar</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
