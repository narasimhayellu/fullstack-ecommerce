import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(
        JSON.parse(localStorage.getItem("isLogin")) || false
    );
    const navigate = useNavigate();

    const login = async (formData) => {
        try {
            const response = await axios.post("https://fullstack-ecommerce-backend-qo62.onrender.com/users/login", formData);
            console.log("Login response:", response.data);
            
            // Extract userId from response and store as string (not JSON)
            const userId = response.data.userId;
            localStorage.setItem("userId", userId); // Store as string, not JSON
            
            // Store login status
            setLogin(true);
            localStorage.setItem("isLogin", JSON.stringify(true));
            
            enqueueSnackbar("Login successful!", { variant: "success" });
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            enqueueSnackbar("Wrong email or password", { variant: "error" });
        }
    };

    const logout = () => {
        setLogin(false);
        localStorage.setItem("isLogin", JSON.stringify(false));
        localStorage.removeItem("userId"); // Clear userId on logout
        localStorage.removeItem("cart"); // Clear cart on logout
        navigate("/");
        enqueueSnackbar("Logout successful!", { variant: "info" });
    };

    const signUp = async (formData) => {
        try {
            const response = await axios.post("https://fullstack-ecommerce-backend-qo62.onrender.com/users/register", formData);
            console.log("Signup response:", response.data);
            enqueueSnackbar("Signup successful!", { variant: "success" });
            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error);
            enqueueSnackbar("Signup failed. Email might already be registered.", { variant: "error" });
        }
    };

    return (
        <AuthContext.Provider value={{ login, setLogin, isLogin, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};




