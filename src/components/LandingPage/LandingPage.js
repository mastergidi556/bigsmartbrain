import React from "react";
import './LandingPage.css'
import land from './robobrain.svg';

const LandingPage = (props) => {
    return(
        <div className="jumbotron">
            <div className="logoWrap"><img src={land} alt=''/> </div>
            <div className="rightSide">
                <div className="landText">
                    <h1>Hello!</h1>
                    <h3>Welcome to Big Brain.</h3>
                    <h4>A platform that helps you detect information from pictures based on Clarifai's Models.</h4>
                </div>
                <div className="buttonss">
                <button onClick={() => props.onRouteChange("signin")} className="butt">Login</button>
                <button onClick={() => props.onRouteChange("register")} className="butt">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage