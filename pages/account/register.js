import {FaUser} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import Layout from "../../components/Layout";
import styles from '../../styles/AuthForm.module.css'
import {useState, useContext} from "react";
import AuthContext from "../../context/AuthContext";


const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const {register, error} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm){
             toast.error('Passwords do not match.')
            return;
        }
        register({username, email, password})
    }

    return (
        <Layout title={'user register'}>
            <div className={styles.auth}>
                <h1><FaUser/> Register</h1>
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}/>
                    </div>
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
                    <div>
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(e)=> setPasswordConfirm(e.target.value)}/>
                    </div>
                    <input type="submit" value="Regisration" className="btn"/>
                </form>
                <p>
                    Already have an account?  <Link href={'/account/login'}>Log In</Link>
                </p>
            </div>
        </Layout>
    );
};

export default RegisterPage;
