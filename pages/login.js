import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import styles from '../styles/Layout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import { setCookie } from 'nookies'
import Router from 'next/router'


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin() {


        const loginInfo = {
            identifier: username,
            password: password
        }

        const login = await fetch(`https://nextjs-firstapplication.herokuapp.com/auth/local`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)

        })
        const loginResponse = await login.json();


        if (loginInfo.indentifier === "" || loginInfo.password === "" || loginResponse.user == undefined) {
            alert("Username or password is incorrect!");
        }
        else {
            setCookie(null, 'jwt', loginResponse.jwt, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            setCookie(null, 'username', loginResponse.user.username, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            setCookie(null, 'job', loginResponse.user.Job, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            setCookie(null, 'id', loginResponse.user.id, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            Router.push('/userContent')
        }


    }

    return (
        <>
            <Head>
                <title>Log In</title>
            </Head>
            <Layout>
                <div className={styles.card}>
                    <h1>Log In</h1>
                    <h2>
                        <Link href="/" passHref>
                            <Link passHref>Back to home</Link>
                        </Link>
                    </h2>
                    <form>
                        <label htmlFor="username">Username</label>
                        <input id="username" onChange={e => setUsername(e.target.value)} value={username}></input>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                    </form>

                    <button type="button" onClick={() => handleLogin()}>Login</button>

                    <h2>
                        <Link href="/signup" passHref>
                            <Link passHref>Don't have an account? Sign Up</Link>
                        </Link>
                    </h2>
                    <div>
                        <p>Login with </p>
                        <Link href="/" passHref><a><FontAwesomeIcon icon={faGoogle} size="2x" /></a></Link>
                        <Link href="/" passHref><a><FontAwesomeIcon icon={faFacebook} size="2x" /></a></Link>
                    </div>
                </div>
            </Layout>
        </>
    )
}



