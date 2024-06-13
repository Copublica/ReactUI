import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SpleshScreen = () => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const link = document.getElementById("titlePageLink");
            if (link) {
                link.click(); // Programmatically click the link after 4 seconds
            }
        }, 3500);

        return () => clearTimeout(timeoutId); // Clear timeout on component unmount
    }, []);

    return (
        <>
            <div className="container px-4" id="hideFleshScreen">
                <div className="card text-left border-0">
                    <div className="card-body">
                        <p className="card-title text-center p-4 text-white rounded-circle" id="cardTitle">
                            <img src="./assets/images/logo.png" width={200} alt="Logo"></img>
                            <Link id="titlePageLink" to="/TitlePage"></Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpleshScreen;
