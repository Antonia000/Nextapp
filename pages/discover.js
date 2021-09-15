import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import UserLayout from '../components/UserLayout'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function discover({ content }) {

    return (
        <>
            <Head>
                <title>Discover</title>
            </Head>

            <UserLayout>

                <div className={styles.contentall}>

                    {content.map(item => (
                        <div className={styles.postall} key={item.id}>
                            <Image width={895} height={895} src={`${item.Picture[0].url}`} className={styles.img} alt="photo" />

                            <div className={styles.text}>
                                <i><FontAwesomeIcon icon={faMapMarkerAlt} /></i><span>{item.Location}</span>
                                <p><span><small>Posted by {item.user.username}</small></span></p>
                                <p>{item.Description}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </UserLayout>


        </>
    );
}
export async function getServerSideProps() {

    const res = await fetch(`https://nextjs-firstapplication.herokuapp.com/user-contents`, {

    })

    const content = await res.json();
    return {
        props: {
            content: content
        }

    }
}