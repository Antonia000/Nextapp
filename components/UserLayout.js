import styles from '../styles/Layout.module.css'
import UserNav from './UserNav'
import Footer from './Footer'

export default function UserLayout({ children }) {
    return (
        <>
            <UserNav />
            <div className={styles.userContainer}>
                {children}
            </div>
            <Footer />

        </>
    )
}