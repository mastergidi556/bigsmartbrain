import React from 'react';
import './ColorModel.css';

class ColorModel extends React.Component {
   
    render () {
        const { box, imageUrl, stuff} = this.props;
        return (
            <div className="mainwrapper">
                <div className="imageWrapper">
                    <div id="image">
                        <img id="inputImage" alt='' src={imageUrl}/>
                    </div>
                </div>
                <div className="output">
                <div className="model-info">Color</div>
                <div className="outputresponse">
                    <div className="outputinfo">
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
                                        box.map((aData) => {
                                            return (
                                                <div className = "colorDiv" style={{background:aData.colorHex}}>
                                                    <div>
                                                    {aData.colorName} {aData.colorHex}
                                                    </div>
                                                    <div>
                                                    {aData.probs}
                                                    </div>
                                                </div>
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

export default ColorModel