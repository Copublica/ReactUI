import React from "react";
import { Link } from "react-router-dom";
function MainPage(){
    return(
        
<div class="hero-container" id="MainPage">
    <div class="heroGreeting">
      <div class="hero-text">
        <h2>Hi! <br/> <span>Akhil</span></h2>
        <p>lets make this day <span>delightful</span> together.</p>
      </div>
      <div class="motivational-box">
      <Link to="/AboutMilla"> <img src="assets/images/slide-carousel2.png" alt=""/></Link>
      </div>  
      <h4 className="mt-4">Trending companions</h4>
      <div class="little-carousels">
        <div class="content" id="silderVoicebot">
          <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/>
          <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/>
          <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/>
          <img src="assets/images/Rectangle 638.png" class="d-block w-100" alt="..."/>
        </div>

      </div>
      <h4>Conversation History</h4>
      <div class="convo-history">
        <div class="accordion1">
          <p>Hey did you placed in MNCs</p>
        </div>
        <div class="accordion1">
          <p>Hello Software Engineer</p>
        </div>
        <div class="accordion1">
          <p>How much do you earn ?</p>
        </div>

      </div>
    </div>

  </div>
  
    )
}
export default MainPage;