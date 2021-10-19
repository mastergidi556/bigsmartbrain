import React from 'react';
import Clarifai from 'clarifai';

import './App.css';
import Particles from 'react-particles-js';
import LandingPage from './components/LandingPage/LandingPage'
import SignInNow from './components/SignInA/SignIn';
import RegisterNow from './components/RegisterA/Register';

import Home from './Home/Home'

const party ={
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 300
      }
    },
}
}

const app = new Clarifai.App({
  apiKey: '2ea72e65bcba44f8a81ef35b4bff5c01'
});

const initialState = {
    input: '',
    imageUrl: '',
    selectedFile: null,
    boxFace: [],
    boxCeleb: [],
    boxApp: [],
    boxDemo: [],
    boxGen: [],
    boxColor: [],
    isLoading: false,
    route: '',
    user: {
      id: '',
      rank: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}
class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        rank: data.rank,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }


  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height)
    const borderHeight = document.getElementById("image").offsetHeight
    const borderWidth = document.getElementById("image").offsetWidth
  
    const allFaces = []
    for (let i=0; i < data.outputs[0].data.regions.length; i++) {
      let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box
      const aFace = {
        id: Math.floor(Math.random() * 5000000000000),
        leftCol: (clarifaiFace.left_col * width) + ((borderWidth - width) / 2),
        topRow: (clarifaiFace.top_row * height) + ((borderHeight - height) / 2),
        rightCol: (width - (clarifaiFace.right_col * width)) + ((borderWidth - width) / 2),
        bottomRow: (height - (clarifaiFace.bottom_row * height)) + ((borderHeight - height) / 2),  
      }
      allFaces.push(aFace)
    }
    this.setState({isLoading: false})
    return allFaces
  }

  faceDetection = (event) => {
    const fileList = event.target.files;
    let file = fileList[0];
    if (file.type && file.type.indexOf('image') === -1) {
        console.log('File is not an image.', file.type, file);
        return;
      }
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
          const encoded = event.target.result.toString().replace(/^data:(.*,)?/, '');

          this.setState({boxFace: [ ]});
          this.setState({boxCeleb: [ ]});
          this.setState({boxApp: [ ]});
          this.setState({boxDemo: [ ]});
          this.setState({boxGen: [ ]});
          this.setState({boxColor: [ ]});

            this.setState({imageUrl: event.target.result});
            this.setState({isLoading: true})



            // fetch('https://boiling-lake-36219.herokuapp.com/imageurl', {
            //   method: 'post',
            //   headers: {'Content-Type': 'application/json'},
            //   body: JSON.stringify({
            //       input: encoded
            //   })
            // })
            // .then(response => response.json())
            // .then(response => {

              app.models
              .predict(Clarifai.FACE_DETECT_MODEL, encoded)
              .then(response => {

              if (response) {
                fetch('https://boiling-lake-36219.herokuapp.com/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      id: this.state.user.id
                  })
              })
              .then(response => response.json())
              .then(data => {
                this.setState(Object.assign(this.state.user, { entries: data}))
              })
              .catch(err => console.log(err))
              };
              this.setState({boxFace : this.calculateFaceLocation(response)})
            })
            .catch(err => console.error(err))
        

          });
      reader.readAsDataURL(file);
}

detectCeleb = (event) => {
  const fileList = event.target.files;
  let file = fileList[0];
  if (file.type && file.type.indexOf('image') === -1) {
      console.log('File is not an image.', file.type, file);
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const encoded = event.target.result.toString().replace(/^data:(.*,)?/, '');
          this.setState({boxFace: [ ]});
          this.setState({boxCeleb: [ ]});
          this.setState({boxApp: [ ]});
          this.setState({boxDemo: [ ]});
          this.setState({boxGen: [ ]});
          this.setState({boxColor: [ ]});

          this.setState({imageUrl: event.target.result});
          this.setState({isLoading: true})

          app.models.predict(
            Clarifai.CELEBRITY_MODEL,
          encoded)
          .then(response => {
            if (response) {
              fetch('https://boiling-lake-36219.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                })
            })
            .then(response => response.json())
            .then(data => {
              this.setState(Object.assign(this.state.user, { entries: data}))
            })
            .catch(err => console.log(err))
            };
            this.setState({boxCeleb : this.calculateCelebLocation(response)})
          })
          .catch(err => console.error(err))
      
    });
    reader.readAsDataURL(file);
}

detectApparel = (event) => {
  const fileList = event.target.files;
  let file = fileList[0];
  if (file.type && file.type.indexOf('image') === -1) {
      console.log('File is not an image.', file.type, file);
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const encoded = event.target.result.toString().replace(/^data:(.*,)?/, '');

        // const body = new FormData();
        // body.append("image", encoded)
        // fetch("https://api.imgbb.com/1/upload?key=cedce0217ec47237a7769c5c5a633cb7", {
        //   method: "POST",
        //   body,
        // })
        // .then(response => response.json())
        // .then(response => {
          this.setState({boxFace: [ ]});
          this.setState({boxCeleb: [ ]});
          this.setState({boxApp: [ ]});
          this.setState({boxDemo: [ ]});
          this.setState({boxGen: [ ]});
          this.setState({boxColor: [ ]});
          this.setState({imageUrl: event.target.result});
          this.setState({isLoading: true})

          app.models.predict(
          "72c523807f93e18b431676fb9a58e6ad",
          encoded)
          .then(response => {
            if (response) {
              fetch('https://boiling-lake-36219.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                })
            })
            .then(response => response.json())
            .then(data => {
              this.setState(Object.assign(this.state.user, { entries: data}))
            })
            .catch(err => console.log(err))
            };
            this.setState({boxApp : this.calculateAppLocation(response)})
          })
          .catch(err => console.error(err))
      
        // })
    });
    reader.readAsDataURL(file);
}

detectDemo = (event) => {
  const fileList = event.target.files;
  let file = fileList[0];
  if (file.type && file.type.indexOf('image') === -1) {
      console.log('File is not an image.', file.type, file);
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const encoded = event.target.result.toString().replace(/^data:(.*,)?/, '');

          this.setState({boxFace: [ ]});
          this.setState({boxCeleb: [ ]});
          this.setState({boxApp: [ ]});
          this.setState({boxDemo: [ ]});
          this.setState({boxGen: [ ]});
          this.setState({boxColor: [ ]});

          this.setState({imageUrl: event.target.result});
          this.setState({isLoading: true})

          app.models.predict(
          "c0c0ac362b03416da06ab3fa36fb58e3",
          encoded)
          .then(response => {
            if (response) {
              fetch('https://boiling-lake-36219.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                })
            })
            .then(response => response.json())
            .then(data => {
              this.setState(Object.assign(this.state.user, { entries: data}))
            })
            .catch(err => console.log(err))
            };
            this.setState({boxDemo : this.calculateDemoLocation(response)})
          })
          .catch(err => console.error(err))
      
    });
    reader.readAsDataURL(file);
}

calculateCelebLocation = (data) => {
  const image = document.getElementById('inputImage');
  const borderHeight = document.getElementById("image").offsetHeight
  const borderWidth = document.getElementById("image").offsetWidth

  const width = Number(image.width)
  const height = Number(image.height)
  const allFaces = []
  for (let i=0; i < data.outputs[0].data.regions.length; i++) {
    let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box
    let clarifaiData = data.outputs[0].data.regions[i].data.concepts[0]
    const aFace = {
      id: Math.floor(Math.random() * 5000000000000),
      leftCol: (clarifaiFace.left_col * width) + ((borderWidth - width) / 2),
      topRow: (clarifaiFace.top_row * height) + ((borderHeight - height) / 2),
      rightCol: (width - (clarifaiFace.right_col * width)) + ((borderWidth - width) / 2),
      bottomRow: (height - (clarifaiFace.bottom_row * height)) + ((borderHeight - height) / 2),
      celebName: clarifaiData.name,
      probs: `${Math.round(clarifaiData.value * 100)}%`
    }
    allFaces.push(aFace)
  }
  this.setState({isLoading: false})
  return allFaces
}

calculateAppLocation = (data) => {
  const image = document.getElementById('inputImage');
  const borderHeight = document.getElementById("image").offsetHeight
  const borderWidth = document.getElementById("image").offsetWidth
  const width = Number(image.width)
  const height = Number(image.height)
  const allFaces = []
  for (let i=0; i < data.outputs[0].data.regions.length; i++) {
    let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box
    let clarifaiData = data.outputs[0].data.regions[i].data.concepts[0]
    const aFace = {
      id: Math.floor(Math.random() * 5000000000000),
      leftCol: (clarifaiFace.left_col * width) + ((borderWidth - width) / 2),
      topRow: (clarifaiFace.top_row * height) + ((borderHeight - height) / 2),
      rightCol: (width - (clarifaiFace.right_col * width)) + ((borderWidth - width) / 2),
      bottomRow: (height - (clarifaiFace.bottom_row * height)) + ((borderHeight - height) / 2),
      celebName: clarifaiData.name,
      probs: `${Math.round(clarifaiData.value * 100)}%`
    }
    allFaces.push(aFace)
  }
  this.setState({isLoading: false})
  return allFaces
}
calculateDemoLocation = (data) => {
  const image = document.getElementById('inputImage');
  const borderHeight = document.getElementById("image").offsetHeight
  const borderWidth = document.getElementById("image").offsetWidth

  const width = Number(image.width)
  const height = Number(image.height)
  const allFaces = []
  for (let i=0; i < data.outputs[0].data.regions.length; i++) {
    let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box
    let clarifaiData1 = data.outputs[0].data.regions[i].data.concepts[0]
    let clarifaiData2 = data.outputs[0].data.regions[i].data.concepts[1]
    let clarifaiData3 = data.outputs[0].data.regions[i].data.concepts[2]
    let clarifaiOtherData = data.outputs[0].data.regions[i].data.concepts
    const sexConcept = clarifaiOtherData.filter((data) => {
      return data.name.includes("ine")
    })
    const originConcept = clarifaiOtherData.filter((data) => {
      return (data.vocab_id.includes("multi"))
    })
    
    const aFace = {
      id: Math.floor(Math.random() * 5000000000000),
      leftCol: (clarifaiFace.left_col * width) + ((borderWidth - width) / 2),
      topRow: (clarifaiFace.top_row * height) + ((borderHeight - height) / 2),
      rightCol: (width - (clarifaiFace.right_col * width)) + ((borderWidth - width) / 2),
      bottomRow: (height - (clarifaiFace.bottom_row * height)) + ((borderHeight - height) / 2),
      ageOne: clarifaiData1.name,
      ageProbsOne: `${Math.round((clarifaiData1.value * 100)*10)/10}%`,
      ageTwo: clarifaiData2.name,
      ageProbsTwo: `${Math.round((clarifaiData2.value * 100)*10)/10}%`,
      ageThree: clarifaiData3.name,
      ageProbsThree: `${Math.round((clarifaiData3.value * 100)*10)/10}%`,
      gender: sexConcept[0].name,
      genderProbs:`${Math.round((sexConcept[0].value * 100)*10)/10}%`,
      raceMain: originConcept[0].name,
      raceProbsMain: `${Math.round((originConcept[0].value * 100)*10)/10}%`,
      raceAlso: originConcept[1].name,
      raceProbsAlso: `${Math.round((originConcept[1].value * 100)*10)/10}%`
    }
    allFaces.push(aFace)
  }
  this.setState({isLoading: false})
  return allFaces
}

detectColor = (event) => {
  const fileList = event.target.files;
  let file = fileList[0];
  if (file.type && file.type.indexOf('image') === -1) {
      console.log('File is not an image.', file.type, file);
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const encoded = event.target.result.toString().replace(/^data:(.*,)?/, '');

          this.setState({boxFace: [ ]});
          this.setState({boxCeleb: [ ]});
          this.setState({boxApp: [ ]});
          this.setState({boxDemo: [ ]});
          this.setState({boxGen: [ ]});
          this.setState({boxColor: [ ]});

          this.setState({imageUrl: event.target.result});
          this.setState({isLoading: true})

          app.models.predict(
            "eeed0b6733a644cea07cf4c60f87ebb7",
            encoded)
            .then(response => {  
                if (response) {
                  fetch('https://boiling-lake-36219.herokuapp.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(response => response.json())
                .then(data => {
                  this.setState(Object.assign(this.state.user, { entries: data}))
                })
                .catch(err => console.log(err))
                };
                this.setState({boxColor : this.calculateColor(response)})
              })
          })      
    reader.readAsDataURL(file);
}

detectGeneral = (event) => {
  const fileList = event.target.files;
  let file = fileList[0];
  if (file.type && file.type.indexOf('image') === -1) {
      console.log('File is not an image.', file.type, file);
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const encoded = event.target.result.toString().replace(/^data:(.*,)?/, '');

        this.setState({boxFace: [ ]});
        this.setState({boxCeleb: [ ]});
        this.setState({boxApp: [ ]});
        this.setState({boxDemo: [ ]});
        this.setState({boxGen: [ ]});
        this.setState({boxColor: [ ]});

        this.setState({imageUrl: event.target.result});
        this.setState({isLoading: true})


          app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
          .then(generalModel => generalModel.predict(encoded))
          .then(response => {
                if (response) {
                  fetch('https://boiling-lake-36219.herokuapp.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(response => response.json())
                .then(data => {
                  this.setState(Object.assign(this.state.user, { entries: data}))
                })
                .catch(err => console.log(err))
                };
                this.setState({boxGen : this.calculateGeneralModel(response)})
              })
          })      
    reader.readAsDataURL(file);
}

calculateColor = (data) => {
  const allFaces = []
  for (let i=0; i < data.outputs[0].data.colors.length; i++) {
    let clarifaiData = data.outputs[0].data.colors[i]
    const aFace = {
      id: Math.floor(Math.random() * 5000000000000),
      colorName: clarifaiData.w3c.name,
      colorHex: clarifaiData.raw_hex,
      probs: `${Math.round(clarifaiData.value * 100)}%`,
    }
    allFaces.push(aFace)
  }
  this.setState({isLoading: false})
  return allFaces
}

calculateGeneralModel = (data) => {
  const allFaces = []
  for (let i=0; i < data.outputs[0].data.concepts.length; i++) {
    let clarifaiData = data.outputs[0].data.concepts[i]
    const aFace = {
      id: Math.floor(Math.random() * 5000000000000),
      concept: clarifaiData.name,
      probs: `${Math.round(clarifaiData.value * 100)}%`,
    }
    allFaces.push(aFace)
  }
  this.setState({isLoading: false})
  return allFaces
}

renderSwitch = (param) => {
  switch(param) {
    case "register":
    return <RegisterNow loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
    case "signin":
    return <SignInNow loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
    case "home":
    return (
    <Home
      name={this.state.user.name}
      isLoading={this.state.isLoading}
      rank={this.state.user.rank}
      entries={this.state.user.entries}
      boxFace={this.state.boxFace}
      boxCeleb={this.state.boxCeleb}
      boxApp={this.state.boxApp}
      boxDemo={this.state.boxDemo}
      boxGen={this.state.boxGen}
      boxColor={this.state.boxColor}
      imageUrl = {this.state.imageUrl}
      faceDetection = {this.faceDetection}
      celebDetection = {this.detectCeleb}
      apparelDetection = {this.detectApparel}
      demoDetection = {this.detectDemo}
      generalDetection = {this.detectGeneral}
      colorDetection = {this.detectColor}
      onRouteChange={this.onRouteChange}
    />);
    default:
    return <LandingPage onRouteChange={this.onRouteChange}/>
  }
}

  render() {    
    return (
      <div>
      
        <Particles className='particles' params={party}/>
          {   
            this.renderSwitch(this.state.route)     
          }

      </div>
    );
  }
}

export default App;
