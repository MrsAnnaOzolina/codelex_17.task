import i18n from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from "react-router-dom";


function Home() {
    const { t } = useTranslation(["home"]);

    const navigate = useNavigate();
    const goBack = () => {
        navigate("/game");
    };
   

    
  return (
<div className="hero fullscreen bg-indigo-600">
<div className="hero-body">
    <div className="content">
        <h2 className="title text-white u-text-center">{t("title")}</h2>
        <div className="level-item u-flex u-justify-center">
        <img style={{borderRadius: "20px", width: "350px"}} src="./src/assets/photo.jpeg" />
        </div>
        <br></br>
        <div className='u-flex u-justify-center'>
        <button className='btn-success' style={{ marginTop: "20px" }} onClick={goBack}>{t("startGame")}</button>
        </div>
        <div><button className='outline btn-transparent'>{t("gameRules")}</button></div>
        </div>
        
</div>
</div>
  )
}

export default Home


