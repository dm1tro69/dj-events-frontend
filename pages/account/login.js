import {FaUser} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import Layout from "../../components/Layout";
import styles from '../../styles/AuthForm.module.css'
import {useState, useContext} from "react";
import AuthContext from "../../context/AuthContext";


const LoginPage = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, error} = useContext(AuthContext)


    const handleSubmit = (e) => {
        e.preventDefault();
        login({email, password})
    }

    return (
        <Layout title={'user login'}>
            <div className={styles.auth}>
                <h1><FaUser/> Log In</h1>
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value="Login" className="btn"/>
                </form>
                <p>
                    Dont have an account?  <Link href={'/account/register'}>Register</Link>
                </p>
            </div>
        </Layout>
    );
};

export default LoginPage;
