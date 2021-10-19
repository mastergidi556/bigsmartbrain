import React from 'react';
import './Register.css';
import Brain2 from './brain2.png'
import Brain3 from './brain.png'



class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onSubmitSignIn = () => {
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
            if (thisUser.id)  {
                this.props.loadUser(thisUser)
                this.props.onRouteChange('home')
            } else {
                const output = document.getElementById("passwordHelp")
                output.textContent = "Username or password incorrect."
                output.style.color = "red";
            }
        })
    }

    onEmailChange = event => this.setState({signInEmail: event.target.value}) 
    onPasswordChange = event => this.setState({signInPassword: event.target.value}) 

    render () {
        return (
            // <div>
            //     <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6  center">
            //         <main className="pa4 black-80">
            //             <div className="measure">
            //                 <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            //                 <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            //                 <div className="mt3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            //                     <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
            //                 </div>
            //                 <div className="mv3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            //                     <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
            //                 </div>
            //                 <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
            //                 </fieldset>
            //                 <div className="">
            //                 <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
            //                 </div>
            //                 <div className="lh-copy mt3">
            //                 <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black pointer db">Sign up</p>
            //                 <a href="#0" className="f6 link dim black db">Forgot your password?</a>
            //                 </div>
            //             </div>
            //         </main>
            //     </article>
            // </div>
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
                        <h1>SIGN IN</h1>
                        <div className="wrapperrhs">
                        <div className="txtbox"> <input onChange={this.onEmailChange} type="email" name="email-address" id="email-address" placeholder="Email Address" required/> </div>
                        <div className="txtbox"><input onChange={this.onPasswordChange} type="password" name="password" id="password" placeholder="Password" required/> </div>
                        <p id="passwordHelp"></p>
                        </div>
                        <div className="create">
                        <button onClick={this.onSubmitSignIn} className="button grow">SIGN IN</button>
                        </div>
                        <h5>New User? <span onClick={() => this.props.onRouteChange('register')} className="log" href="#">SIGN UP</span></h5>
                    </div>
                </div>
            </article>
        )
    }
}

export default SignIn