import React from 'react';
import './Register.css';
import Brain2 from './brain2.png'
import Brain3 from './brain.png'



class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            email: '',
            password: '',
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
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('signin')
                // this.props.onRouteChange('home')
            } else {
                alert('you might want to try that again')
            }
        })

    }

    checkPasswordLength = (event) => {
        const output = document.getElementById("passwordHelp");
        const password1 = event.target.value;
        if (password1.length < 6) {
            output.textContent = "Error: Your password must be at least 6 characters long.";
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
            output.textContent = `Both passwords match, we are good to go.`
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
        return (
            
            <article>
                <div className="fornavothertext"><img alt='' src={Brain2}/><span>BigSmartBrain</span></div>

                <div className="container">
                    <div className="lhs">
                        <div className="forcircle">
                            <img alt='' src={Brain3}/>
                        </div>
                        <div className="fortext"><h1>BIGBRAIN</h1></div>
                    </div>
                    <div className="rhs">
                        <h1>SIGN UP</h1>
                        <div className="wrapperrhs">
                        <div className="txtbox"> <input onBlur={this.validateEmail} onChange={this.onEmailEnter} type="email" id="email-address" placeholder="Email Address" required/></div>
                        <span style={{color:"red"}} id="emailHelp"></span>
                        <div className="txtbox"><input onChange={this.onNameEnter} type="text" name="name" id="name" placeholder="Username" required/></div>
                        <div className="txtbox"><input onInput={this.checkPasswordLength} type="password" name="password" id="password1" placeholder="Password" required/> </div>
                        <div className="txtbox"><input onChange={this.matchPasswordAndSetPassword} type="password" id="password2" name="password" placeholder="Confirm Password" required/></div>
                        <p id="passwordHelp"></p>
                        </div>
                        <div className="create">
                        <button onClick={this.onSubmitRegister} className="button">CREATE ACCOUNT</button>
                        </div>
                        <h5>Already created account? <span onClick={() => this.props.onRouteChange('signin')} className="log">LOGIN</span></h5>
                    </div>
                </div>
            </article>
        )
    }
}

export default Register
            // <div>
            //     <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6  center">
            //         <main className="pa4 black-80">
            //             <div className="measure">
            //                 <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            //                 <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
            //                 <div className="mt3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            //                     <input onChange={this.onNameEnter} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
            //                 </div>
            //                 <div className="mt3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            //                     <input onChange={this.onEmailEnter} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
            //                 </div>
            //                 <div className="mv3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            //                     <input onChange={this.onPasswordEnter} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
            //                 </div>
            //                 <div className="mv3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="confpassword">Confirm Password</label>
            //                     <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="confpassword"  id="confpassword"/>
            //                 </div>
            //                 <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
            //                 </fieldset>
            //                 <div className="">
            //                 <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up"/>
            //                 </div>
            //                 <div className="lh-copy mt3">
            //                 <p onClick={() => this.props.onRouteChange('signin')} className="f6 link dim black pointer db">Already Have an account? Sign in</p>
            //                 </div>
            //             </div>
            //         </main>
            //     </article>
            // </div>