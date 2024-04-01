import {useEffect} from "react";
import { Route, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";

const CampusDirectorRoute = (
    // props
) => {
    // const token = localStorage.getItem("token");
    // const navigate = useNavigate();

    // function presentPage() {
    //     navigate(-1);
    // }

    // if (!token) return <Navigate to="/" />;

    // useEffect(()=>{
    //     if(token && jwtDecode(token).role!== "admin"){ 
    //         presentPage()
    //     }
    // },[token && jwtDecode(token).role!== "admin"])

    // const decodedData = jwtDecode(token);


    // if (decodedData.role === "admin") {
    //     return <Outlet {...props} />;
    // }
    // else if(decodedData.role!=="admin"){
    //     presentPage()
    // }
};

export default CampusDirectorRoute;