import React from 'react';
import './CelebRecognition.css';

class CelebRecognition extends React.Component {
   
    render () {
        const { box, imageUrl, stuff} = this.props;
        return (
            <div className="mainwrapper">
                <div className="imageWrapper">
                    <div id="image">
                        <img id="inputImage" alt='' src={imageUrl}/>
                            {
                                box.map((aFace) => {
                                    const height = 510 - aFace.bottomRow - aFace.topRow
                                    return (
                                        <div className="boundingBox" key={aFace.id} style={{top: aFace.topRow, right: aFace.rightCol, bottom: aFace.bottomRow, left: aFace.leftCol}}>
                                        <label className='box-label' style={{ bottom: height }}>
                                            {aFace.celebName} {aFace.probs}
                                        </label>
                                        </div>
                                    )
                                })
                            }
                    </div>
                </div>
                <div className="output">
                <div className="model-info">Celebrity</div>
                <div className="outputresponse">
                    <div className="outputinfo">
                        <div className="outputDetails"><div className="titleData">Predicted Concept</div><div className="titleData">Probability</div></div>
                        {
                            this.props.isLoading 
                                    ? 
                                    (
                                        <div style={{marginTop: 30}} className='spinner-overlay'>
                                            <div className='spinner-container' />
                                        </div>

                                    )
                                    :
                                    (
                                        box.map((aFace) => {
                                            return (
                                                <div className="outputDetails"><div className="bodyData">{aFace.celebName}</div> <div className="bodyData">{aFace.probs}</div></div>
                                            )
                                        })
                                    )
                        }
                    </div>
    
                    <input onChange={stuff} type="file" name="file" id="file" className="inputfile" accept=".jpg, .jpeg, .png"/>
                    <label className="" htmlFor="file">Upload a picture</label>
    
                </div>
    
                </div>
            </div>
        )
    }
}

export default CelebRecognition