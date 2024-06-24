import React from "react";
import { Link } from "react-router-dom";
function MainPage(){
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  const userName = getCookie('name');
    return(
        
<div className="hero-container" id="MainPage">
    <div className="heroGreeting">
      <div className="hero-text">
        <h2>Hi! <br/> <span>{userName}</span></h2>
        <p>lets make this day <span>delightful</span> together.</p>
      </div>
      <div className="motivational-box">
      <Link to="/AboutMilla"> <img src="assets/images/slide-carousel2.png" alt=""/></Link>
      </div>  
      <h4 className="mt-4">Trending companions</h4>
      <div className="little-carousels">
        <div className="content" id="silderVoicebot">
        <Link to="/AboutMilla#AIDSAwareness" className="link">  <div className="voivecard">
            <h4>AIDS Awareness</h4>
          </div></Link>
          <Link to="/AboutMilla#NoMoreStress" className="link">  <div className="voivecard">
            <h4>No More stess</h4>
          </div></Link>
         
          {/* <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/>
          <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/>
          <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/>
          <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/> */}
          
        </div>

      </div>
      <h4>Conversation History</h4>
      <div className="convo-history">
        <div className="accordion1">
          <p>Hey did you placed in MNCs</p>
        </div>
        <div className="accordion1">
          <p>Hello Software Engineer</p>
        </div>
        <div className="accordion1">
          <p>How much do you earn ?</p>
        </div>

      </div>
    </div>

  </div>
  
    )
}
export default MainPage;