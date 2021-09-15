import styles from '../styles/Footer.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Nav() {

    return (
        <nav className={styles.nav}>
            <ul key="links">
                <li>
                    <Link href="/">All rights reserved</Link>
                </li>
                <li>
                    <Link href="/">Community</Link>
                </li>
                <li>
                    <Link href="/">Help</Link>
                </li>
                <li>
                    <Link href="/">Privacy</Link>
                </li>
            </ul>

            <ul>
                <li><Link href="/">Follow us</Link></li>
                <li>
                    <Link href="/"><FontAwesomeIcon icon={faGoogle} size="2x" /></Link>
                    <Link href="/"><FontAwesomeIcon icon={faFacebook} size="2x" /></Link>
                    <Link href="/"><FontAwesomeIcon icon={faInstagram} size="2x" /></Link>
                </li>
            </ul>
            <ul></ul>
            <ul></ul>
            <ul>
                <li>
                    <Link href="/">Contact us</Link>
                </li>
                <li>
                    <input type="text" placeholder="email"></input>
                </li>
                <li>
                    <textarea type="text" placeholder="message..."></textarea>
                </li>
                <button className={styles.button} type="submit">Send</button>
            </ul>
        </nav>
    )
}