import { useState } from "react";

import { close, menu } from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { NotificationManager } from "react-notifications";

// Navbar component
const Navbar = ( {signedIn, setSignedIn} ) => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setSignedIn(false);
    localStorage.removeItem("userId");
    NotificationManager.success('You have successfully logged out!');
    navigate("/");
  }

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <h1 className="text-white font-bold text-2xl">ReelView</h1>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] transition hover:text-neutral-300 ${
              active === nav.title ? "text-white" : "text-slate-200"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
        {signedIn && <Link to="/profile"><li className="flex bg-gray-500 rounded-full w-8 h-8 items-center justify-center text-white ml-10 transition hover:scale-[1.04] shadow-md"><IoPersonSharp /></li></Link>}
        {signedIn ? <li><button className="bg-orange-500 rounded-md px-3 py-1 text-white ml-10 transition shadow-md" onClick={handleLogout}>Log Out</button></li> : <Link to="/login"><li className="bg-orange-500 rounded-md px-3 py-1 text-white ml-10 transition hover:scale-[1.04] shadow-md">Log In</li></Link>}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-slate-200"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;