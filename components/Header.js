import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/Header.module.css"
import Search from "./Search";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
    const {user, logout} = useContext(AuthContext)
    return (
        <header className={styles.header}>
           <div className={styles.logo}>
               <Link href={'/'}>
                   <a>DJ Events</a>
               </Link>
           </div>
            <Search/>
            <nav>
                <ul>
                    <li>
                        <Link href={'/events'}>
                            <a>Events</a>
                        </Link>
                    </li>
                    {user ? <>
                        <li>
                            <Link href={'/events/add'}>
                                <a>Add Event</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/account/dashboard'}>
                                <a>Dashboard</a>
                            </Link>
                        </li>
                        <li>
                            <button onClick={()=>logout()} className="btn-secondary btn-icon">
                                <FaSignOutAlt/> Logout
                            </button>
                        </li>
                    </>: <>
                        <li>
                            <Link href={'/account/login'}>
                                <a className={'btn-secondary btn-icon'}>
                                    <FaSignInAlt/>
                                    Login
                                </a>
                            </Link>
                        </li>
                    </>}


                    {/*<li>*/}
                    {/*    <Link href={'/account/register'}>*/}
                    {/*        <a>Registration</a>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
