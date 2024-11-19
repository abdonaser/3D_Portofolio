import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { navLinks } from "../constants";
import { abdoLogo2, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav
        className={`${
          styles.paddingX
        } w-full flex items-center py-2 fixed top-0 z-20
${scrolled ? "bg-primary" : "bg-transparent"}`}>
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto py-2">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}>
            <div className="w-[65px] h-[65px] bg-red-600 rounded-lg overflow-hidden">
              <img src={abdoLogo2} alt="logo" className=" w-full h-full  " />
            </div>
            <p className="text-white text-[18px] font-bold cursor-pointer flex  flex-col">
              Abdelrahamn Naser &nbsp;
              <span className="sm:block hidden"> | Front-End Developer</span>
            </p>
          </Link>

          {/* nav links  */}
          <ul className="list-none hidden md:flex flex-row gap-10">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active == link.title ? "text-white" : "text-secondary"
                } text-[18px] font-medium cursor-pointer hover:text-white `}
                onClick={() => {
                  setActive(link.title);
                }}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>

          {/* toggle menu in small screen */}
          <div className="md:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] cursor-pointer"
              onClick={() => {
                setToggle(!toggle);
              }}
            />

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
              <ul className="list-none flex flex-col justify-end items-start gap-4">
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active == link.title ? "text-white" : "text-secondary"
                    } text-[16px] font-medium font-poppins cursor-pointer`}
                    onClick={() => {
                      setActive(link.title);
                      setToggle(!toggle);
                    }}>
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
