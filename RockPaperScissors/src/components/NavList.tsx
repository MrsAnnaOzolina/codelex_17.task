import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";


function NavList() {
  let activeStyle = {
    textDecoration: "underline",
  };

  const { i18n, t } = useTranslation(["common"]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length! > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (

    <div className="header header-fixed u-unselectable header-animated">
      <div
        className="header-brand"
      >
        <div className="nav-item no-hover">
          <a href="/" className="title"> <h6>{t("rockpaparscissors")} </h6> </a>
        </div>
        <div className="nav-item" >
          <span> <NavLink
            to=""
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            {t("home")}
          </NavLink>
          </span>
          <span><NavLink
            to="game"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            {t("game")}
          </NavLink></span>
          <span><NavLink
            to="statistic"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            {t("statistic")}
          </NavLink></span>
        </div>
        <div
          className="col-xs-9 level-item input-control languageBar"
        >
          <select
            className="input--sm"
            value={localStorage.getItem("i18nextLng")!}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="lv">Latvian</option>
            <option value="ge">German</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default NavList