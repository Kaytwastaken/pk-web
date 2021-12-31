import React from 'react'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LogoutButton from '../components/logoutButton'

import { Input, Text, Button, Box } from '@chakra-ui/react'

type Props = {
    token: string
}

export async function getServerSideProps(context : any) {
    const parsedCookies = cookie.parse(context.req.headers.cookie || "")
    
    // if (parsedCookies.token != "" || undefined || null) {
    //     return {
    //         redirect: {
    //             destination: '/profile',
    //             permenant: 'true'
    //         }
    //     }
    // }
    
    return { props: { token: parsedCookies.token || "" } }
}

export default function Home({token} : any, props:Props) {
    const [value, setValue] = React.useState('')
    const handleChange = (event : any) => setValue(event.target.value)

    const router = useRouter()

    const logIn = () => {fetch("/api/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: value }),
    });
        router.push("/profile");
    }

    return (
        <div className="body">
            <Head>
                
            </Head>
            <div className="container">
                <h1>Community PluralKit web interface :D</h1>
                <Text mb='8px'>Enter your PluralKit token here. Use pk;token to get it.</Text>
                <Input 
                    my={2}
                    className='aaa'
                    value={value}
                    onChange={handleChange}
                    placeholder='pk;token'
                    size='sm'
                />
                <Button 
                    onClick={logIn}
                    isDisabled = {value ? false : true}
                    bgColor = "teal.200"
                    mr={4}
                >
                    Submit
                </Button>

            </div>
            <footer>
                <a className="footer-links" href="https://github.com/xSke/PluralKit">PluralKit by xSke on GitHub</a>
                {" | "}
                <a className="footer-links" href="https://github.com/greysdawn/pluralkit-web">Inspiration from Greysdawn's Plurakit Web</a>
                {" | "}
                <a className="footer-links" href="https://github.com/airrocket/pk-web">Source code</a>
            </footer>
            {/* <Box
                display="flex"
                fontSize="lg"
                pos="absolute"
                bottom="0"
                bgColor="teal.300"
                color="white"
                w="full"
                h="min"
                alignItems="center"
                justifyContent="center"
            >
                <a className="footer-links" href="https://github.com/xSke/PluralKit">PluralKit by xSke on GitHub</a>
                {" | "}
                <a className="footer-links" href="https://github.com/greysdawn/pluralkit-web">Inspiration from Greysdawn's Plurakit Web</a>
                {" | "}
                <a className="footer-links" href="https://github.com/airrocket/pk-web">Source code</a>
            </Box> */}
        </div>
    )
}