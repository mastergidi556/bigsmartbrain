import React from 'react';
import brain from './brain2.png'


const Navigation = (props) => {
    return (
        <div>
        <div className="navv">
            <div className="sectionwrapper1">
                <div className="logo">
                    <div className="logopicture"><img alt="" src={brain}/></div>
                    <div className="menubar"><a href="javascript:void(0);" className="icon" onclick="myFunction()"><i className="fa fa-bars"></i></a></div>
                </div>
                <ul className="navlinks" id="myTopnav">
                    <li className="display link dim black pointer">Face Detection</li>
                    <li className="display link dim black pointer">Celebrity</li>
                    <li className="display link dim black pointer">General</li>
                    <li className="display link dim black pointer">Apparel</li>
                    <li className="display link dim black pointer">Demographics</li>
                    <li className="display link dim black pointer">Color</li>
                    <li className="display link dim black pointer">Food</li>
                    <li className="display link dim black pointer">Signout</li>
                </ul>
            </div>
        </div>

        {/* <nav className="db dt-l w-100 border-box pa3 ph5-l">
        <p className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#" title="Home">
            <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name"/>
        </p>
        <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">Face Detection</p>
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">Celebrity</p>
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">General</p>
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">Apparel</p>
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">Demographic</p>
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">Color</p>
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">Food</p>
            <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">Signout</p>
        </div>
        </nav> */}
    </div>

        /* <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => props.onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
        </nav> */
    )
}

export default Navigation