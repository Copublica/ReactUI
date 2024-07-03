import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LoginPage()
{
  console.log("welcome to login page");

  const setCookie=(name, value, days)=> {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  
    return(
        <div className="container px-4 mt-5 py-5" id="loginpage">
        <p className="title-text text-center font-weight-bold text-secondary">
          Meet your 
          <br />
          <span className="text-dark">Empathetic</span> companion
        </p>
        <p className="text-center text-danger mb-3">Let’s get started</p>
        <form action="/action_page.php">
          <div className="form-group">
            <input type="email" className="form-control" id="email"  placeholder="Email address:"/>
            <i className="far fa-envelope"></i>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="pwd"  placeholder="Password"/>
            <i className="fa-regular fa-eye-slash"></i>
             {/* <i className="fa-solid fa-eye"></i>  */}
            <div className="checkbox">
              <label className="label-title px-3 py-2"><input type="checkbox" /> Remember me</label>
            </div>
          </div>
          <div className="form-group">
          <button type="button" className="btn-login btn btn-primary py-1 border-0">Log in</button>
          </div>
        </form>
        <div className="social-media text-center mt-5">
          <span className="fw-bold"/><span className="line"></span> sign in with <span className="line"></span>
          <div className="social-media-icons mt-2">
            <div className="s-col-4">
              
            <GoogleOAuthProvider clientId="338976857027-7eaird3188j265pb2vf0ltmt7m53o01c.apps.googleusercontent.com">
        
        <GoogleLogin
          onSuccess={credentialResponse => {
            const decodedCredential = jwtDecode(credentialResponse.credential);
            console.log(decodedCredential);
              // Setting cookies with user information
              setCookie('name', decodedCredential.name, 70); // Expires in 7 days
              setCookie('email', decodedCredential.email, 70);
              setCookie('picture', decodedCredential.picture, 70);
              window.location.href = "/welcome"; 
              }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
              <img src="assets/images/search.png" id="googleicons"/>
            </div>
            <div className="s-col-4">
              <img src="assets/images/facebook.png" id="facebook"/>
            </div>
            <div className="s-col-4">
              <img src="assets/images/linkedin.png" id="linkdin"/>
              </div>
          </div>
        </div>
        <div className="switch-login mt-2">
          <p className="text-center mt-2 h6">Don’t have an account? 
            <Link to="/SignUp">Sign up</Link> 
            </p>
           
        </div>
      </div>
    )
}
export default LoginPage;