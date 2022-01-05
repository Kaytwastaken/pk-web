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
    
    return { props: { token: parsedCookies.token || "" } }
}

export default function Home() {
    // Initialize state for handling buttons and inputs
    const [state, setState] = React.useState({
        value: '',
        edit: true,
        inputPlaceholder: "pk;token",
        commandMessage: "Enter your PluralKit token here. Use pk;token to get it."
    })
    const handleChange = (event : any) => setState({
        value: event.target.value,
        edit: state.edit,
        inputPlaceholder: state.inputPlaceholder,
        commandMessage: state.commandMessage
    })

    const router = useRouter()

    async function login() {
        if (state.edit) {
            await fetch("/api/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: state.value }),
            })
            router.push("/profile");
            
        } else {
            router.push(`/profile/${state.value}`)
        }
    }

    function setToView() {
        setState({
            value: state.value,
            edit: false, inputPlaceholder: "pk;s",
            commandMessage: "Enter a 5-letter system id here. Use pk;s to get your own."
        })
    }

    function setToEdit() {
        setState({
            value: state.value,
            edit: true,
            inputPlaceholder: "pk;token",
            commandMessage: "Enter your PluralKit token here. Use pk;token to get it."
        })
    }


    return (
        <div className="body">
            <Head>
                
            </Head>
            <div className="container">
                <h1>Community PluralKit web interface :D</h1>
                <div className='view-edit-container'>
                    <Button 
                        onClick={setToEdit}
                        id='edit-button'
                        bgColor = "teal.200"
                        isDisabled={state.edit}
                    >
                        Edit your system
                    </Button>
                    <Button 
                        onClick={setToView}
                        id='view-button'
                        bgColor = "teal.200"
                        isDisabled={!state.edit}
                    >
                        View public system info
                    </Button>
                </div>
                <Input
                    value={state.value}
                    onChange={handleChange}
                    placeholder={state.inputPlaceholder}
                />
                <p>{state.commandMessage}</p>
                <Button 
                    onClick={login}
                    isDisabled = {state.value ? false : true}
                    bgColor = "teal.200"
                    mr={4}
                >
                    Submit
                </Button>

            </div>
            <footer>
                <a
                    className="footer-links"
                    href="https://github.com/xSke/PluralKit"
                >
                    PluralKit by xSke on GitHub
                </a>
                {" | "}
                <a
                    className="footer-links"
                    href="https://github.com/greysdawn/pluralkit-web"
                >
                    Inspiration from Greysdawn's Plurakit Web
                </a>
                {" | "}
                <a
                    className="footer-links"
                    href="https://github.com/airrocket/pk-web"
                >
                    Source code
                </a>
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