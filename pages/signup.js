import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Layout.module.css'
import Layout from '../components/Layout'
import img from '../public/images/sidephoto.jpg'
import { useState } from 'react'
import Router from 'next/router'

export default function Register() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function handleRegister() {

        const registerInfo = {
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName

        }

        const register = await fetch(`https://nextjs-firstapplication.herokuapp.com/auth/local/register `, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerInfo)

        })
        const registerResponse = await register.json();

        if (registerResponse.jwt) {
            Router.push('/login')
        }

    }

    return (
        <Layout>
            <Head>
                <title>Signup</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.signup}>

                <form>
                    <h1>Sign Up</h1>
                    <h2>
                        <Link href="/" passHref>
                            <Link passHref>Back to home</Link>
                        </Link>
                    </h2>
                    <label htmlFor="first-name">First Name</label>
                    <input id="first-name" onChange={e => setfirstName(e.target.value)} value={firstName} ></input>
                    <label htmlFor="last-name">Last Name</label>
                    <input id="last-name" onChange={e => setlastName(e.target.value)} value={lastName}></input>
                    <label htmlFor="email">Email</label>
                    <input id="email" onChange={e => setEmail(e.target.value)} value={email} ></input>
                    <label htmlFor="username">Username</label>
                    <input id="username" onChange={e => setUsername(e.target.value)} value={username} ></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={e => setPassword(e.target.value)} value={password} ></input>
                    <button type="button" onClick={() => handleRegister()}>Sign up</button>
                    <h2>
                        <Link href="/login" passHref>
                            <Link passHref>Already have an account? Login</Link>
                        </Link>
                    </h2>
                </form>


                <div >
                    <Image src={img} alt="Side Photo" className={styles.side} layout="responsive"></Image>
                </div>
            </div>

        </Layout>
    );
}

