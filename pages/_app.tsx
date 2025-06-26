import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import '../styles/style.scss'

import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { RootStore } from '../stores/RootStore'
import { Provider } from 'inversify-react'
import { ModalsContainer } from '../modals'
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';


const rootStore = new RootStore()
const container = rootStore.container

function MyApp({Component, pageProps}: AppProps) {
    const [showChild, setShowChild] = useState(false);

    // try to reconnect to web3
    useEffect(() => {
        setShowChild(true);
console.log('app');
        // rootStore.walletStore.tryReconnect()
    }, [])


    if (!showChild) return null
    if (typeof window === 'undefined') return <></>

    return (
        <>
            <Head>
                <title>{`Jigen`}</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="keywords" content="NFT, Jigen"/>
                <link rel="icon" href="https://pbs.twimg.com/profile_images/1462138008698867722/MbfJ2kSM_400x400.png"/>
            </Head>
            <Provider container={container}>
                <SessionProvider session={pageProps.session}>
                    {/*@ts-ignore*/}
                    <Component {...pageProps} />
                    <ModalsContainer/>
                    <ToastContainer theme="colored"/>
                </SessionProvider>
            </Provider>
        </>

    )
}

export default MyApp
