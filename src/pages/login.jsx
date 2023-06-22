import "../styles/login.css";

const LoginPage = () => {
    return ( 
         <div className="LoginCSS">
            <div>
                test
            </div>
            <div className="wrapper">
                <div className="logo">
                    <div className="logopicture">
                        <div className="group1">

                        </div>
                    </div>
                </div>
                
            <div className="container">
                <body className="username">
                    <div className="inputlayout">
                        <text className="text">
                            Email
                        </text>
                    </div>
                </body>

                <body className="password">
                    <div className="inputlayout">
                        <text className="text">
                            Password
                        </text>
                    </div>
                </body>
                <div className="loginButton">
                    <div className="loginText">
                        Login
                    </div>
                    <div className="forgot">
                        Forgot Password?
                    </div>
                </div>
                
            </div>
        </div> 
     </div>       
    ) 
}
export default LoginPage