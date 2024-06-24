import React from "react";
import { Link,useLocation } from "react-router-dom";
function AboutMila() {

    const location = useLocation();
    const hash = location.hash.substring(1); // Remove the '#' from the hash
    console.log(hash);
    // Set default text and override it based on the hash value
    let title = "Sel";
    let bio = "I'm your compassionate voicebot, ready to support both kids and adults seeking emotional guidance and social emotional learning. I'm here to listen, offer guidance, and foster growth.";
    let urls="/display#Sel"
    
    if (hash === "AIDSAwareness") {
        urls="/display#AIDSAwareness"
        title = "AIDS Awareness";
        bio = "I'm Milla a voicebot, dedicated to raising awareness about HIV/AIDS. I'm here to answer your questions and address misconceptions surrounding transmission, prevention, and testing.";
    } else if (hash === "NoMoreStress") {
        title = "No More Stress";
        urls="/display#NoMoreStress"
        bio = "I'm Milla, your compassionate voicebot to guide through rough times. With a background in psychology and a passion for supporting others, I'm dedicated to providing a safe space for individuals.";
    }

    return (
        <div className="mila-container" id="AboutMilla">
            <div className="aboutMila">
                <div className="milaNav">
                    <div className="navbar-4">
                        <Link to="/MainPage"><button className="back-button" type="button"><i className='fas fa-angle-left'></i> </button></Link>
                    </div>
                </div>

                <div className="mila-card">
                <h1>{title}<br /><span>bio</span></h1>
                    <img src="assets/images/mila-image.png" alt="mila image" />
                    <p>{bio}</p>
                </div>
                <div className="faq d-flex flex-column justify-content-center">
                    <div className="faq-text"><h3 className="ps-2">FAQs</h3></div>
                    <div className="allFAQs">
                        <div className="faq1">
                            <a href="#"><p>Hey did you placed in MNCs / Hey did you placed in MNCs</p></a>
                        </div>
                        <div className="faq1">
                            <a href="#"><p>Hello Software Engineer/Hello Software Engineer of MNCs</p></a>
                        </div>
                        <div className="faq1">
                            <a href="#"><p>How much do you earn ?/How much do you earn ?</p></a>
                        </div>
                    </div>
                    <div className="start-button d-flex justify-content-center m-2"><Link to={urls}> <button className="mila-start-button">Start Call</button></Link></div>
                </div>
            </div>
        </div>
    )
}
export default AboutMila;

