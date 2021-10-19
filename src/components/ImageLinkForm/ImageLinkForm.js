import React from 'react';
import './ImageLinkForm.css';



class ImageLinkForm extends React.Component {
    // constructor(props) {
    //     super(props) 
    // }
    

    readImage = (file) => {
        // Check if the file is an image.
        if (file.type && file.type.indexOf('image') === -1) {
          console.log('File is not an image.', file.type, file);
          return;
        }
      
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          this.setState({imageUrl: event.target.result});
        });
        reader.readAsDataURL(file);
    }


    

    render() {
        const { onInputChange, onButtonSubmit, stuff, input} = this.props;

        return (
            <div>
                <p className='f3'>
                    Put the link to your picture make you see wetin go happen.
                </p>
                <div className='center'>
                    <div className='somecenter shadow-5 br3 pa4 form '>
                        <div className='kini'>
                            <input onChange={onInputChange} className='f4 pa2 w-70 center' type='text' value={input}/>
                            <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                        </div>
                        <div>
                            <p>Alternatively, you can upload files.<input onChange={stuff} type="file" id="input_img" accept=".jpg, .jpeg, .png"/></p> 
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default ImageLinkForm