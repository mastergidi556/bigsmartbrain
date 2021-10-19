import React from 'react';
import './DemoDetection.css';

class DemoDetection extends React.Component {
   
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
                                    console.log(height)
                                    return (
                                        <div className="boundingBox" key={aFace.id} style={{top: aFace.topRow, right: aFace.rightCol, bottom: aFace.bottomRow, left: aFace.leftCol}}>
                                        <label className='box-label' style={{ bottom: height }}>
                                            {aFace.ageOne} {aFace.gender} {aFace.raceMain}
                                        </label>
                                        </div>
                                    )
                                })
                            }

                    </div>
                </div>
                <div className="output">
                <div className="model-info">Demographics</div>
                <div className="outputresponse">
                    <div className="outputinfo">
                        <div className="outputDetails"><div className="titleData">Gender</div><div className="titleData">Probability</div></div>
                        {
                            this.props.isLoading 
                                    ? 
                                    (
                                        <div style={{marginTop: 30}} className='spinner-overlay'>
                                            <div className='spinner-container' />
                                        </div>

                                    )
                                    :
                                    box.map((aFace) => {
                                        return (
                                            <div className="outputDetails"><div className="bodyData">{aFace.gender}</div> <div className="bodyData">{aFace.genderProbs}</div></div>
                                        )
                                    })
                        }

                        <div style={{marginBottom: 20, marginTop: 20}}>
                        <div className="outputDetails"><div className="titleData">Age</div><div className="titleData">Probability</div></div>
                        {
                            this.props.isLoading 
                                    ? 
                                    (
                                        <div style={{marginTop: 30}} className='spinner-overlay'>
                                            <div className='spinner-container' />
                                        </div>

                                    )
                                    :
                                    box.map((aFace) => {
                                        return (
                                            <div>
                                                <div className="outputDetails"><div className="bodyData">{aFace.ageOne}</div> <div className="bodyData">{aFace.ageProbsOne}</div></div>
                                                <div className="outputDetails"><div className="bodyData">{aFace.ageTwo}</div> <div className="bodyData">{aFace.ageProbsTwo}</div></div>
                                                <div className="outputDetails"><div className="bodyData">{aFace.ageThree}</div> <div className="bodyData">{aFace.ageProbsThree}</div></div>
                                            </div>
                                        )
                                    })
                        }
                        </div>


                        <div className="outputDetails"><div className="titleData">Race</div><div className="titleData">Probability</div></div>
                        {
                            this.props.isLoading 
                                    ? 
                                    (
                                        <div style={{marginTop: 30}} className='spinner-overlay'>
                                            <div className='spinner-container' />
                                        </div>

                                    )
                                    :                                    
                                    box.map((aFace) => {
                                        return (
                                            <div >
                                                <div className="outputDetails"><div className="bodyData">{aFace.raceMain}</div> <div className="bodyData">{aFace.raceProbsMain}</div></div>
                                                <div className="outputDetails"><div className="bodyData">{aFace.raceAlso}</div> <div className="bodyData">{aFace.raceProbsAlso}</div></div>
                                            </div>
                                        )
                                    })
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

export default DemoDetection