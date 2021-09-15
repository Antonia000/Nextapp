import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import { parseCookies } from 'nookies'
import Image from 'next/image'
import UserLayout from '../components/UserLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faUserTie, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from '../components/Modal'
import { useState } from 'react'
import Cookies from 'cookies'
import axios from 'axios'
import Router from 'next/router'
import profile from '../public/images/profile.png'

export default function Content({ content, auth, jwt, job, id, statusCode }) {
    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState('');
    const [post, setPost] = useState('');

    console.log(content);
    if (statusCode != 200) {
        console.log('error');
    }
    if (content === undefined) {
        return (
            <UserLayout>
                <div id="modal-root">
                    <div className={styles.buttons}>
                        <button>Contact</button>
                        <button>Connect</button>
                        <input onChange={(e) => setFiles(e.target.files[0])} type="file" name="files" className={styles.upload} />
                        <button type="submit" onClick={handleUpload}>Upload file</button>
                    </div>
                    <div className={styles.profile}>
                        <Image width={100} height={100} src={profile} className={styles.avatar} alt="photo" />
                        <h2>{auth}</h2>
                        <p><FontAwesomeIcon icon={faUserTie} /><span>{job}</span></p>
                        <p><i><FontAwesomeIcon icon={faMapPin} /></i><i>Bucharest, Romania</i></p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                </div>
            </UserLayout>
        );
    }
    async function handleUpload() {

        const encodeFile = (file) => {
            var reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    var Base64 = reader.result;
                    setFiles(Base64);
                }
            }
        }
        encodeFile(files);
        const uploadData = new FormData();
        uploadData.append('files', files);
        uploadData.append('__contentType', 'UserContent')
        uploadData.append('refId', '')
        uploadData.append('field', 'Picture')


        const upload = await axios({
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: 'https://nextjs-firstapplication.herokuapp.com/upload',
            data: uploadData
        })


        const data = {
            Description: "Description",
            Location: "",
            Picture: {
                "id": upload.data[0].id,
                "formats.small.url": upload.data[0].formats.small.url
            },
            user: {
                "id": id,
                "username": auth
            }

        }
        const uploadpost = await fetch(`https://nextjs-firstapplication.herokuapp.com/user-contents`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        const response = await uploadpost.json();
        Router.push('/userContent');
    }

    return (
        <>
            <Head>
                <title>Your Page</title>
            </Head>

            <UserLayout>
                <div id="modal-root">
                    <div className={styles.buttons}>
                        <button>Contact</button>
                        <button>Connect</button>
                        <input onChange={(e) => setFiles(e.target.files[0])} type="file" name="files" className={styles.upload} />
                        <button type="submit" onClick={handleUpload}>Upload file</button>

                    </div>
                    <div className={styles.profile}>
                        <Image width={100} height={100} src={`${content[0].user.Avatar[0].url}`} className={styles.avatar} alt="photo" />
                        <h2>{auth}</h2>
                        <p><FontAwesomeIcon icon={faUserTie} /><span>{job}</span></p>
                        <p><i><FontAwesomeIcon icon={faMapPin} /></i><i>Bucharest, Romania</i></p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                    <div className={styles.content}>

                        {content.map((item) => (
                            <div className={styles.post} key={item.id}>
                                <Image width={895} height={895} src={`${item.Picture[0].url}`} className={styles.img} onClick={(e) => {
                                    setShowModal(true)
                                    setPost(e.target.getAttribute('src').slice(95).replace('&w=1920&q=75', ''))
                                }} alt="photo" />

                                <div className={styles.text}>
                                    <i><FontAwesomeIcon icon={faMapMarkerAlt} /></i><span>{item.Location}</span>
                                    <p>{item.Description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Modal
                        onClose={() => setShowModal(false)}
                        show={showModal}
                    >
                        <Image width={895} height={895} src={`https://res.cloudinary.com/dsjzunvn6/image/upload/${post}`} className={styles.img} alt="photo" />
                    </Modal>
                </div>
            </UserLayout>


        </>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const { req } = ctx;
        const jwt = parseCookies(ctx).jwt;
        const cookies = new Cookies(req)
        const auth = cookies.get('username');
        const job = cookies.get('job');
        const id = cookies.get('id');

        const res = await fetch(`https://nextjs-firstapplication.herokuapp.com/user-contents?user.username=${auth}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const content = await res.json();

        return {
            props: {
                content: content,
                auth: auth,
                jwt: jwt,
                job, job,
                id: id
            }
        }
    } catch {
        return {
            props: { statusCode: 503 }
        }
    }

}
