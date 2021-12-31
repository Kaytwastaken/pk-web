import { Button } from "@chakra-ui/react"
import { useRouter } from 'next/router'

export default function LogoutButton() {
    const router = useRouter()
    
    const logOut = () => {fetch("/api/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    })
        router.push('/')
    }
    
    return (
        <Button onClick={logOut}>
            Log out
        </Button>
    )
}