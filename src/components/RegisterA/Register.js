import React from "react";
import './SignIn.css'
import land from './robobrain.svg';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            email: '',
            password: '',
            isLoading: false
        }
    }

    onNameEnter = event => this.setState({name: event.target.value});
    onEmailEnter = event => this.setState({email: event.target.value});
    onPasswordEnter = event => this.setState({password: event.target.value});

    validateEmail = e => {
        const emailRegex = /.+@.+\..+/;
        let validityMessage = "";
        if (!emailRegex.test(e.target.value)) {
            validityMessage = "Invalid email address";
        }
        document.getElementById("emailHelp").textContent = validityMessage;
    }


    onSubmitRegister = () => {
        const emailpart = document.getElementById("email-address").value;
        const passwordpart1 = document.getElementById("password1").value;
        const passwordpart2 = document.getElementById("password2").value;
        const emailRegex = /.+@.+\..+/;
        const passwordRegex = /\d/; 
        if (!emailRegex.test(emailpart) || passwordpart1.length <6 || !passwordRegex.test(passwordpart1) || (passwordpart1 !== passwordpart2)) {
                const output = document.getElementById("passwordHelp");
                output.textContent = `You have to satisfy all registration conditions to register.`
                output.style.color = "red";
            return
        } else {
            this.setState({isLoading: true})
        fetch('https://boiling-lake-36219.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            this.setState({isLoading: false})
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('signin')
            } else if (user === 'unable to register') {
                let validityMessage = "";
                validityMessage = "Email address already exists.";
                document.getElementById("emailHelp").textContent = validityMessage;
            } else if (user === 'incorrect form submission') {
                const output = document.getElementById("passwordHelp");
                output.textContent = `You cannot leave any field empty.`
                output.style.color = "red";
            }
        })
        }
    }

    checkPasswordLength = (event) => {
        const output = document.getElementById("passwordHelp");
        const password1 = event.target.value;
        if (password1.length < 6) {
            output.textContent = "Your password must be at least 6 characters long.";
            output.style.color = "red";
        } else if (password1.length >= 6) {
            const passwordRegex = /\d/; 
            if (!passwordRegex.test(event.target.value)) {
                output.textContent = `This is not a valid password. Your must must include at least 1 digit.`
                output.style.color = "red";
            } else if (passwordRegex.test(event.target.value)) {
                output.textContent = `This is a valid password.`
                output.style.color = "green";
            }
        }
    }

    matchPassword =() => {
        const firstPassword = document.getElementById("password1");
        const secondPassword = document.getElementById("password2");
        const output = document.getElementById("passwordHelp");
    
        if (firstPassword.value === secondPassword.value) {
            output.textContent = `Both passwords match.`
            output.style.color = "green";
        } else {
            output.textContent = `Make sure both passwords match.`
            output.style.color = "red";
        }

    }

    matchPasswordAndSetPassword = (event) => {
        this.matchPassword();
        this.onPasswordEnter(event);
    }


    render () {
        return(
            <div className="jumbotron">
                <div className="logoWrap"><img src={land} alt=''/> </div>
                <div className="rightSide">
                    <div className="landTexts">
                        <h1>Welcome to Big Brain!</h1>
                        <h4>Sign up to use our service.</h4>
    
    
                        <div style={{height: 375}}>
                            <div className="wrapperrhs">
                                <div className="txtbox"><input onBlur={this.validateEmail} onChange={this.onEmailEnter} type="email" id="email-address" placeholder="Email Address" required/></div>
                                <span style={{color:"red"}} id="emailHelp"></span>
                                <div className="txtbox"><input onChange={this.onNameEnter} type="text" name="name" id="name" placeholder="Username" required/></div>
                                <div className="txtbox"><input onInput={this.checkPasswordLength} type="password" name="password" id="password1" placeholder="Password" required/> </div>
                                <div className="txtbox"><input onChange={this.matchPasswordAndSetPassword} type="password" id="password2" name="password" placeholder="Confirm Password" required/></div>
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
                    <button onClick={this.onSubmitRegister} className="butter">Sign Up</button>
                    <p>Already have an account? <span onClick={() => this.props.onRouteChange('signin')} className="signline">Sign In</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
