import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

                return response.data
            }
        } catch (e) {
            if (e.response.data) return e.response.data
            else return { success: false, message: e.message }
        }

    }

    /// Context data
    const AuthContextData = { loginUser }

    // Return provider

    return <AuthContext.Provider value={AuthContextData}>
        {children}
    </AuthContext.Provider>


}

export default AuthContextProvider