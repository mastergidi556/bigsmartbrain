import React from 'react';
import './Typical.css';

function Back () {
    return (
        <div className="mainwrapper">
            <div className="imageWrapper">
                <div className="image">
                    <img id="inputImage" alt='' src='https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/307/307383/an-aging-woman.jpg?w=1155&h=1470' width='500px' />
                </div>
            </div>
            <div className="output">
            <p className="model-info">Face</p><hr/>
            <div className="outputresponse">
                <div className="outputinfo">
                    <p>huygujhklkjhg</p>
                </div>

                <input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png"/>
                <label className="" for="file">Upload a picture</label>

            </div>

            </div>
        </div>
    )
}

export default Back