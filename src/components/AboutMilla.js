import React from "react";
import { Link } from "react-router-dom";
function AboutMila() {
    return (
        <div class="mila-container" id="AboutMilla">
            <div class="aboutMila">
                <div class="milaNav">
                    <div class="navbar-4">
                        <Link to="/MainPage"><button class="back-button" type="button"><i class='fas fa-angle-left'></i> </button></Link>
                    </div>
                </div>

                <div class="mila-card">
                    <h1>Mental<br /><span>Awareness</span></h1>
                    <img src="assets/images/mila-image.png" alt="mila image" />
                    <p>I'm Milla, your compassionate guide through rough times. I am dedicated to providing a safe space for individuals struggling with mental health challenges.</p>
                </div>
                <div class="faq d-flex flex-column justify-content-center">
                    <div class="faq-text"><h3 class="ps-2">FAQs</h3></div>
                    <div class="allFAQs">
                        <div class="faq1">
                            <a href="#"><p>Hey did you placed in MNCs / Hey did you placed in MNCs</p></a>
                        </div>
                        <div class="faq1">
                            <a href="#"><p>Hello Software Engineer/Hello Software Engineer of MNCs</p></a>
                        </div>
                        <div class="faq1">
                            <a href="#"><p>How much do you earn ?/How much do you earn ?</p></a>
                        </div>
                    </div>
                    <div class="start-button d-flex justify-content-center m-2"><Link to="/Voice"> <button class="mila-start-button">Start Call</button></Link></div>
                </div>
            </div>
        </div>
    )
}
export default AboutMila;

