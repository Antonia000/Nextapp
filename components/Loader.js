import Layout from '../components/Layout'
import styles from '../styles/Layout.module.css'
import Image from 'next/image'

export default function Loader() {
    return (
        <Layout>
            <div className={styles.card}>
                <Image width={200} height={200} src={`https://res.cloudinary.com/dsjzunvn6/image/upload/v1632984977/Wedges-3s-200px_eb3o1u.gif`} alt="photo" />
                <h5>Loading...</h5>
            </div>

        </Layout>



    );
}