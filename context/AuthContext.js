import {createContext, useState} from "react";
import {useRouter} from "next/router";
import {API_URL} from "../config";

const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)

    //Register user
    const register = async (user) => {
        console.log(user)
    }


    //Login user
    const login = async ({email: identifier, password}) => {
        console.log({identifier, password})
    }


    //Logout user
    const logout = async () => {
        console.log('logout')
    }


    //Check if user is logged in
    const checkUserLogin = async (user) => {
        console.log('Check')
    }
    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext