import { Button } from "@chakra-ui/react"
import { useRouter } from 'next/router'

export default function EditButton(uuid : string) {
    const router = useRouter()
    
    

    // const logOut = () => {fetch("/api/logout", {
    //     method: "post",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({}),
    // })
    //     router.push('/')
    // }
    
    // let logoutButton
    // if (token != "") {
    //     logoutButton = (
    //         <Button onClick={logOut}>
    //             Log out
    //         </Button>
    //     )
    // } else {
    //     logoutButton = (
    //         <h2>After inputting your token, you'll stay "logged in" for one hour.</h2>
    //     )
    // }
    
    // return (
    //     logoutButton
    // )
}