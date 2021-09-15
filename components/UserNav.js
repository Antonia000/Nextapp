import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { destroyCookie } from 'nookies'
import Router from 'next/router'

export default function UserNav() {

    async function Signout(ctx) {
        destroyCookie(ctx, 'jwt');
        destroyCookie(ctx, 'id');
        destroyCookie(ctx, 'job');
        destroyCookie(ctx, 'username');
        Router.push('/login')
    }
    return (
        <nav className={styles.navUser}>
            <ul>
                <li>
                    <Link href="/discover" passHref>Discover</Link>
                </li>
                <li>
                    <Link href="/userContent" passHref><a><FontAwesomeIcon icon={faUserCog} /></a></Link>
                </li>
                <li>
                    <button className={styles.button} onClick={() => Signout()}>Sign Out</button>
                </li>

            </ul>
        </nav>
    )
}
