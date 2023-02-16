import i18n from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";


function Home() {
  const { t } = useTranslation(["home"]);
  const [showRules, setShowRules] = useState(false)

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/game");
  };

  const gameRules = () => {
    setShowRules(current => !current)
    console.log()
  }

  return (
    <div className="hero fullscreen bg-indigo-600">
      <div className="hero-body">
        <div className="content">
          <h2 className="title text-white u-text-center">{t("title")}</h2>
          <div className="level-item u-flex u-justify-center">
            <img style={{ borderRadius: "20px", width: "350px" }}
              src="./src/assets/photo.jpeg"
            />
          </div>
          <br></br>
          <div className='u-flex u-justify-center'>
            <button className='btn-success' style={{ marginTop: "20px" }} onClick={goBack}>{t("startGame")}</button>
          </div>
          <div><button className='outline btn-transparent' onClick={gameRules} > {t("gameRules")}</button></div>
          <div
          > <img
              style={{ display: showRules ? 'block' : 'none', width: "65vw", position: "absolute", top: "5rem", left: "15rem" }}
              src="./src/assets/Rules.png" alt="rules"
              onClick={() => setShowRules(false)}
            /></div>
        </div>

      </div>
    </div>
  )
}

export default Home


