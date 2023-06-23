import "../styles/login.css";

const LoginPage = () => {
    return ( 
        <div>
            <div className="LoginCSS">
                <div className="wrapper">
                    <div className="logo">
                        <logo className="logopicture">

                        </logo>
                    </div>
                    <div className="container">
                        <div className="username">
                            <div className="inputlayout">
                                <p className="text">
                                    Email
                                </p>
                            </div>
                        </div>
                        <div className="password">
                            <div className="inputlayout">
                                <p className="text">
                                    Password
                                </p>
                            </div>
                        </div>
                        <button className="loginButton">
                               <p> Login </p>
                        </button>
                        <div className="forgot">
                            Forgot password?
                        </div>

                    </div>
                </div>
                <div className="outsidetext">
                    ENCRORED
                </div>
                <div>
                    <p className="noacc">Don't have an account? </p>
                    <p className="signup">Sign Up?</p>
                </div>
            </div>
        </div>      
    ) 
}
export default LoginPage