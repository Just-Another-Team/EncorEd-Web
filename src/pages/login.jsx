import "../styles/login.css";

const LoginPage = () => {
    return ( 
            <div className="LoginCSS">
                <div className="wrapper">
                    <div className="logo">
                        <logo className="logoPicture">

                        </logo>
                    </div>
                    <div className="container">
                        <div className="userName">
                            <div className="inputLayout">
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
                <div className="outsideText">
                    ENCRORED
                </div>
                <div>
                    <p className="noAccount">Don't have an account? </p>
                    <p className="signUp">Sign Up?</p>
                </div>
            </div>
    
    ) 
}
export default LoginPage