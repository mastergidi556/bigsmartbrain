import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className='center na'>
            <div className='absolute nt2'>
                <img id="inputImage" alt='' width='500px' height='auto' src={imageUrl}/>
                    {
                        box.map((aFace) => {
                            return (
                                <div className="boundingBox" key={aFace.id} style={{top: aFace.topRow, right: aFace.rightCol, bottom: aFace.bottomRow, left: aFace.leftCol}}>
                                {/* <label className='box-label' style={{ bottom: height }}>
                                    face
                                </label> */}
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default FaceRecognition