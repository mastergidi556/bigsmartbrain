import React from 'react';
import './Home.css';
import FaceDetection from '../components/FaceDetection/FaceDetection';
import CelebRecognition from '../components/CelebRecognition/CelebRecognition';
import ApparelDetection from '../components/ApparelDetection/ApparelDetection';
import DemoDetection from '../components/DemoDetection/DemoDetection';
import GenModel from '../components/GeneralModel/GenModel.js';
import ColorModel from '../components/ColorModel/ColorModel.js'
import Brain from './brain.png'
import HamburgerMenu from 'react-hamburger-menu'



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            navRoute: '',
        }
    }

    handleMenuClick = () => {
        this.setState({
            open: !this.state.open
        });
        var x = document.getElementById("myTopnav");
        if (x.className === "navlinks") {
          x.className += " responsive";
        } else {
          x.className = "navlinks";
        }
    
    }


    onRouteChange = (route) => {
        this.setState({
            navRoute: route
        });
    }
    
    navRenderSwitch = (param) => {
        switch(param) {
            case "face":
                return (
                    <div>
                        <div className="forEvery">
                            <div style={{backgroundImage: "url(https://f.hubspotusercontent20.net/hubfs/4505120/home/facedetection.jpg)" }} className="forPicture">
                            </div>
                            <div>
                                <div className="forText">Face Detection</div>
                                <div className="forData">Detect the location of faces with bounding boxes.</div>
                            </div>
                        </div>
                        <FaceDetection isLoading={this.props.isLoading} box={this.props.boxFace} imageUrl={this.props.imageUrl} stuff={this.props.faceDetection}/>
                    </div>
                )
            case "celeb":
                return (
                    <div>
                    <div className="forEvery">
                        <div style={{backgroundImage: "url(https://f.hubspotusercontent20.net/hubfs/4505120/home/celebrity.jpg)" }} className="forPicture">
                        </div>
                        <div>
                            <div className="forText">Celebrity</div>
                            <div className="forData">Identify celebrities that closely resemble detected faces.</div>
                        </div>
                    </div>
                    <CelebRecognition isLoading={this.props.isLoading} box={this.props.boxCeleb} imageUrl={this.props.imageUrl} stuff={this.props.celebDetection}/>
                </div>
                )
                case "demo":
                    return (
                        <div>
                        <div className="forEvery">
                            <div style={{backgroundImage: "url(https://f.hubspotusercontent20.net/hubfs/4505120/home/demographics.jpg)" }} className="forPicture">
                            </div>
                            <div>
                                <div className="forText">Demographics</div>
                                <div className="forData">Predict the age, gender or cultural appearances of faces.</div>
                            </div>
                        </div>
                        <DemoDetection isLoading={this.props.isLoading} box={this.props.boxDemo} imageUrl={this.props.imageUrl} stuff={this.props.demoDetection}/>
                        </div>
                    )
            case "gen":
                return (
                    <div>
                    <div className="forEvery">
                        <div style={{backgroundImage: "url(https://f.hubspotusercontent20.net/hubfs/4505120/general.jpg)" }} className="forPicture">
                        </div>
                        <div>
                            <div className="forText">General Model</div>
                            <div className="forData">Recognize over 11,000 different concepts including objects, themes, moods and more.</div>
                        </div>
                    </div>
                    <GenModel isLoading={this.props.isLoading} box={this.props.boxGen} imageUrl={this.props.imageUrl} stuff={this.props.generalDetection}/>
                    </div>
                )
            case "color":
                return (
                    <div>
                    <div className="forEvery">
                        <div style={{backgroundImage: "url(https://f.hubspotusercontent20.net/hubfs/4505120/home/color.jpg)" }}  className="forPicture">
                        </div>
                        <div>
                            <div className="forText">Color Model</div>
                            <div className="forData">Identify the dominant colors present in your images in hex or W3C.</div>
                        </div>
                    </div>
                    <ColorModel isLoading={this.props.isLoading} box={this.props.boxColor} imageUrl={this.props.imageUrl} stuff={this.props.colorDetection}/>
                    </div>
                )
            case "app":
                return (
                    <div>
                    <div className="forEvery">
                        <div style={{backgroundImage: "url(https://f.hubspotusercontent20.net/hubfs/4505120/home/apparel-detection.jpg)" }} className="forPicture">
                        </div>
                        <div>
                            <div className="forText">Apparel Detection</div>
                            <div className="forData">Detect items of clothing or fashion-related items.</div>
                        </div>
                    </div>
                    <ApparelDetection isLoading={this.props.isLoading} box={this.props.boxApp} imageUrl={this.props.imageUrl} stuff={this.props.apparelDetection}/>
                    </div>
                )
            default: 
            return (
                <div>
                    <div style={{borderRadius: 5}} className="modelText">
                        <h3>MODEL GALLERY</h3>
                        <h2>Get started with advanced pre-trained models</h2>
                        <h4>Explore pre-built, ready-to-use image recognition models to suit your specific needs.</h4>
                        Select a model from the navigation bar to get started.<hr/>
                        Click the upload button to add the picture you want to detetct images from.<hr/>
                        Wait for some seconds.<hr/>

                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>

                <nav>
                    <div className="sectionwrapper1">
                        <div className="logo">
                            <div className="logopicture"><img alt='' src={Brain}/></div>
                            <div className="menubar"><HamburgerMenu isOpen={this.state.open} menuClicked={this.handleMenuClick} className="menu" width={18} height={15} color='#149df2'/></div>
                        </div>
                        
                        {/* <span onClick={this.handleMenuClick} className="menu"><i class="fa fa-bars"></i></span> */}
                        <ul className="navlinks" id="myTopnav">
                            <li onClick={() => this.onRouteChange('face')}  className="display">Face Model</li>
                            <li onClick={() => this.onRouteChange('celeb')} className="display">Celebrity Model</li>
                            <li onClick={() => this.onRouteChange('demo')} className="display">Demographic Model</li>
                            <li onClick={() => this.onRouteChange('gen')}  className="display">General Model</li>
                            <li onClick={() => this.onRouteChange('color')} className="display">Color Model</li>
                            <li onClick={() => this.onRouteChange('app')} className="display">Apparel Model</li>
                            <li onClick={() => this.props.onRouteChange('signin')} className="display">Sign Out</li>
                        </ul>
                    </div>
                </nav>

                <div className="bodyWrapper">

                    <div>
                        <h1>Welcome, {this.props.name}!</h1>
                    </div>

                    <div style={{textAlign: "center"}}>
                    <h2>You have successfully submitted <span>{this.props.entries}</span> entries.</h2>
                    <h2>This ranks you as number <span>{this.props.rank}</span> on the website.</h2>                        
                    </div>

                    {   
                        this.navRenderSwitch(this.state.navRoute)     
                    }


                </div>

                <footer style = {{color: "#252161", justifyContent: "center", textAlign: "center", display: "flex", alignItems: "center", height: 45, marginTop: 15, background: "white"}}>Designed by Daniel Beckley using Clarifai's API. &copy; 2020.</footer>
            </div>
        )
    }
}

export default Home
                            
