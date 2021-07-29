
import Link from "next/link";
import styles from "../styles/Header.module.css"
import Search from "./Search";

const Header = () => {
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
                    <li>
                        <Link href={'/events/add'}>
                            <a>Add Event</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
