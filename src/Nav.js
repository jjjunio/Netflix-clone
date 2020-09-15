import React, { useEffect, useState } from "react";

import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  // nav animation
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? handleShow(true) : handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src="https://occ-0-748-999.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABb1cbkSw0zlqKMw9s38PKkK5b4rEBnWBVKBNWg00DbNxVJxsRRHfs9YAf4AK6vkIkPzuhfrq6hc7ttZ8IWmMXkIrrtfb.png"
        alt="User avatar"
      />
    </div>
  );
}

export default Nav;
