import styles from '../styles/Navbar.module.css'
import Link from 'next/link'

export default function Nav() {

    return (
        <nav className={styles.nav}>
            <ul>
                <li key="home">
                    <Link href="/" passHref>
                        <button className={styles.buttonlogin}>
                            Home</button>
                    </Link>
                </li>
                <li key="login">
                    <Link href="/login" passHref>
                        <button className={styles.buttonlogin}>
                            Log In</button>
                    </Link>
                </li>
                <li key="signup">
                    <Link href="/signup" passHref>
                        <button className={styles.buttonlogin}>
                            Sign Up</button>
                    </Link>
                </li>

                <li key="search">
                    <input type="text" placeholder="Search..." className={styles.input}></input>
                </li>

            </ul>
        </nav>
    )
}