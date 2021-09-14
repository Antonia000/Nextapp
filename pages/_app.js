import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically 
import Router from 'next/router'
import { parseCookies } from 'nookies'


function MyApp({ Component, pageProps }) {

    return (
        <>
            <Component {...pageProps} />
        </>
    )
}
function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}


MyApp.getInitialProps = async ({ ctx }) => {
    let pageProps = {}
    const jwt = parseCookies(ctx).jwt;

    if (jwt === 'undefined' || jwt === 'null' || !jwt) {

        if (ctx.pathname === "/userContent") {
            redirectUser(ctx, "/login");
        }
    }

    return {
        pageProps
    }
}

export default MyApp
