import Head from 'next/head'

import '../styles/themes.css'
import '../styles/styules.css'
import '../styles/profile.css'
import '../styles/home.css'
import styles from '../styles/mobileCatch.module.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>

        <meta name='application-name' content='pk-web'/>
        <meta name='author' content='Kayt_was_taken'/>
        <meta name='description' content='A web based editor for pluralkit information!'/>
        <meta name='keywords' content='pluralkit, web, editor, discord, bot, pluralkit web, pluralkit web editor'/>
      </Head>
      
      <div className={styles.mobile}>
        <h2>This website currently only works on desktop, please check the <a className={styles.link} href="https://github.com/airrocket/pk-web">GitHub</a> for more information and update schedule.</h2>
      </div>

      <div className={styles.desktop}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </div>
    </>
  )
}
export default MyApp
