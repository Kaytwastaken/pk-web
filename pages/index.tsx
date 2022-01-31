import React from 'react'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Footer from '../components/footer'

import { Input, Tooltip } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'

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
            edit: false,
            inputPlaceholder: "xxxxx",
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
                <h1>PluralKit web interface :D</h1>
                <h3>Made by Kayt_was_taken! (<a href="https://github.com/kaytwastaken">GitHub</a>) (<a href="https://kayt.dev">Personal</a>)</h3>
                <div className='view-edit-container'>
                    <Button 
                        onClick={setToEdit}
                        id='edit-button'
                        colorScheme = "teal"
                        variant={state.edit ? "solid" : "outline"}
                    >
                        Edit your system
                    </Button>
                    <Tooltip label="Coming soon!™">
                        <Button 
                            // onClick={setToEdit}
                            // onClick={setToView}
                            id='view-button'
                            colorScheme = "teal"
                            variant={state.edit ? "outline" : "solid"}
                            
                            // Because not done yet lol
                            // isDisabled={true}
                        >
                            View public system info
                        </Button>
                    </Tooltip>
                </div>
                <Input
                    className='token'
                    value={state.value}
                    onChange={handleChange}
                    placeholder={state.inputPlaceholder}
                />
                <p>{state.commandMessage}</p>
                <Button 
                    onClick={login}
                    isDisabled = {state.value ? false : true}
                    colorScheme = "teal"
                    mr={4}
                >
                    Submit
                </Button>

            </div>
            <Footer/>
        </div>
    )
}