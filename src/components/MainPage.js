import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
function MainPage() {

  console.log("welcome to main page");

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
  function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  function handleLogout() {
    deleteCookie('name');
  }

  const userName = getCookie('name');
  return (

    <div className="hero-container" id="MainPage">
      <div className="heroGreeting">
      <div className="heading-content d-flex justify-content-between">
          <div className="hero-text">
            <h2>Hi! <br /> <span>{userName}</span></h2>
            <p>lets make this day <span>delightful</span> together.</p>
          </div>
          
           <div className="logout text-danger" id="logout" onClick={handleLogout}>
            <i className="fa-solid fa-power-off"></i>
          </div>
        </div>

        <div className="motivational-box">
          <Link to="/AboutMilla"> <img src="assets/images/image.png" alt="" /></Link>
        </div>
        <h4 className="mt-4">Trending companions</h4>
        <div className="little-carousels">
          <div className="content" id="silderVoicebot">

            {/* <Link to="/AboutMilla#AIDSAwareness" className="link">  <div className="voivecard">
              <h4>AIDS Awareness</h4>
            </div></Link>
            <Link to="/AboutMilla#NoMoreStress" className="link">  <div className="voivecard">
              <h4>No More stess</h4>
            </div></Link> */}

          <Link to="/AboutMilla#sel" className="link">  <img src="assets/images/sel.png" className="d-block" alt="..."/></Link>
          <Link to="/AboutMilla#NoMoreStress" className="link"><img src="assets/images/mental.png" className="d-block" alt="..."/></Link>
          <Link to="/AboutMilla#AIDSAwareness" className="link"><img src="assets/images/Aids.png" className="d-block" alt="..."/></Link>
       

          </div>

        </div>
        <h4>Frequently asked questions</h4>
        <div className="convo-history">
          <div className="accordion1">
            <p>I am feeling anxious. What should I do?</p>
          </div>
          <div className="accordion1">
            <p>I am not able to cope with surroundings</p>
          </div>
          <div className="accordion1">
            <p>Can you help with my stress?</p>
          </div>

        </div>
      </div>

    </div>

  )
}
export default MainPage;