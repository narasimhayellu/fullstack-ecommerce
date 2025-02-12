import { enqueueSnackbar } from "notistack";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLogin, setLogin] = useState(
        JSON.parse(localStorage.getItem("isLogin"))
    );

    const navigate = useNavigate();
    
    const login = async(formData) => {
        const usersData = localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        :[];

        const myArr = usersData.filter((each) => {
            console.log(each);
            return each.email === formData.email && each.password === formData.password;
        })

        if(myArr.length > 0){
            setLogin(true);
            navigate("/");
            enqueueSnackbar("Login successful!", { variant: "success" });
        }
            else{
                enqueueSnackbar("Wrong email or Password. Please re-check", {variant: "error",});
            }
        }
    
    const logout = async()=>{
        setLogin(false);
        localStorage.setItem("isLogin", JSON.stringify(false));
        navigate("/");
        enqueueSnackbar("Logout successful!", { variant: "info" });
    }    

    const signUp = async(formData) => {
        const {email} = formData;

        const usersData = localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        :[];
        console.log(usersData);

        const myArr = usersData.filter((each) => {
            console.log(each);
            return each.email === email;
        })
        if(myArr.length > 0){
            enqueueSnackbar("User already exists!", { variant: "error" });
        } else {
            usersData.push(formData);
            console.log(usersData);
            localStorage.setItem("users", JSON.stringify(usersData));
            navigate("/");
            enqueueSnackbar("Signup successful!", { variant: "success" });
        }
    }
    return(
        <AuthContext.Provider value = {{login, setLogin, isLogin, signUp, logout}}>
            {children}
        </AuthContext.Provider> 
    );
};
