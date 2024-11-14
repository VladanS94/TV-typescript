import React, { useEffect, useRef, useState } from "react";
import { allItems } from "./side-menu-list";
import { useRecoilState } from "recoil";
import { focusMovieState, FocusStateEnum } from "../../state/atoms/FocusState";
import "./SideMenu.css";
import { activeMenuState } from "../../state/atoms/ActiveItemState";
import { SideMenuProps } from "../../types/CurrentModalType";

const SideMenu = ({ setActivePage }: SideMenuProps) => {
  const [focus, setFocus] = useRecoilState(focusMovieState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useRecoilState(activeMenuState);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setActivePage("login");
  };

  useEffect(() => {
    itemsRef.current[currentIndex]?.focus();
    if (focus === FocusStateEnum.SIDEMENU) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
          setCurrentIndex((prevIndex) =>
            prevIndex < allItems.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else if (e.key === "ArrowUp") {
          setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
        } else if (e.key === "ArrowRight") {
          setFocus(FocusStateEnum.MOVIES);
          setActiveMenuItem(!activeMenuItem);
        } else if (e.key === "Enter") {
          if (currentIndex === allItems.length - 1) {
            handleLogout();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [currentIndex, setFocus, focus]);

  return (
    <div className={activeMenuItem ? "active-menu" : "not-active-menu"}>
      <h1 className="side-menu-title">CliQ</h1>
      <ul className="side-menu-list">
        {allItems.map((item, index) => (
          <li
            key={item.id}
            tabIndex={-1}
            ref={(el) => (itemsRef.current[index] = el)}
            className={
              focus === FocusStateEnum.MOVIES ? "no-focus-visible" : ""
            }
            onClick={index === allItems.length - 1 ? handleLogout : undefined}
          >
            <img
              width={25}
              height={25}
              src={item.icon}
              alt={`${item.label} icon`}
            />
            <p className="sidemenu-paragraf">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
