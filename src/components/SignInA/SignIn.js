import React from "react";
import './SignIn.css'
import land from './robobrain.svg';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isLoading: false,
        }
    }

    onSubmitSignIn = () => {
        this.setState({isLoading: true})
        fetch('https://boiling-lake-36219.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(thisUser => {
            this.setState({isLoading: false})
            if (thisUser.id)  {
                this.props.loadUser(thisUser)
                this.props.onRouteChange('home')
            } else if (thisUser === "incorrect password") {
                const output = document.getElementById("passwordHelp")
                output.textContent = "Incorrect Password."
                output.style.color = "red";
            } else if (thisUser === "incorrect email") {
                const output = document.getElementById("passwordHelp")
                output.textContent = "Email is not registered."
                output.style.color = "red";
            } else if (thisUser === "incorrect form submission") {
                const output = document.getElementById("passwordHelp")
                output.textContent = "Cannot submit empty fields."
                output.style.color = "red";
            } else {
                const output = document.getElementById("passwordHelp")
                output.textContent = "Check your network connection."
                output.style.color = "red";
            }
        })
    }

    onEmailChange = event => this.setState({signInEmail: event.target.value}) 
    onPasswordChange = event => this.setState({signInPassword: event.target.value}) 


    render () {
        return(
            <div className="jumbotron">
                <div className="logoWrap"><img src={land} alt=''/> </div>
                <div className="rightSide">
                    <div className="landTexts">
                        <h1>Welcome Back!</h1>
                        <h4>Sign in to continue.</h4>
    
    
                        <div style={{height: 215}}>
                            <div className="wrapperrhs">
                            <div className="txtbox"> <input onChange={this.onEmailChange} type="email" name="email-address" id="email-address" placeholder="Email Address" required/> </div>
                            <div className="txtbox"><input onChange={this.onPasswordChange} type="password" name="password" id="password" placeholder="Password" required/> </div>
                            <div> 
                                {this.state.isLoading 
                                    ? 
                                    (
                                        <div className='spinner-overlay'>
                                            <div className='spinner-container' />
                                        </div>

                                    )
                                    : <span id="passwordHelp"></span>
                                } 
                            </div>
                            </div>
                        </div>
    
    
    
                    </div>
                    <div className="buttonsszz">
                    <button onClick={this.onSubmitSignIn} className="butter">Login</button>
                    <p>Don't have an account? <span onClick={() => this.props.onRouteChange('register')} className="signline">Sign Up</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn