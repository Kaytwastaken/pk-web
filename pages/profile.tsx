import cookie from 'cookie'
import { System, Member, Props } from '../components/types'

// Custom components
import LogoutButton from '../components/logoutButton'
import Footer from '../components/footer'
import { constructDiv } from '../components/members'
import SystemInfo from '../components/sysInfo'

export async function getServerSideProps(context : any) {
    let parsedCookies
    try {
        parsedCookies = cookie.parse(context.req.headers.cookie)
    } catch (error) {
        console.log("No-cookie reditect")
        return {
            redirect: {
                destination: '/',
                permenant: 'true'
            }
        }
    }
    
    const pk = "https://api.pluralkit.me/v2"
    const id = '@me'
    const sysres = await fetch(`${pk}/systems/${id}`, {
        method: "get",
        headers: {
            "Authorization": parsedCookies.token
        }
    })
    const sys:System = await sysres.json()
    
    const memres = await fetch(`${pk}/systems/${id}/members`, {
        method: "get",
        headers: {
            "Authorization": parsedCookies.token
        }
    })
    const mem:Array<Member> = await memres.json()

    const memMap = new Map()
    if (mem.constructor.name === "Array") {
        mem.forEach((member) => {
            memMap.set(member.uuid, member)
        })
    }
    
    return { 
        props: {
            token: parsedCookies.token,
            system: sys,
            members: Array.from(memMap),
        }
    }
}

export default function Home(props: Props) {
    // Declare var for storing the returned divs from constructDiv
    let memberDivs: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = []

    if (props.members.constructor.name === "Array") {
        memberDivs = []
        props.members.forEach((element) => {
            // For each member returned from the API call, construct a <div> with their information
            // from components/members
            memberDivs.push(constructDiv(element))
        })
    } else {
        // router.push('/')
        console.log("")
    }

    // Return content
    if (props.members.constructor.name === "Array") {
        return (
            <div className='profile-body'>
                {/* Sys left */}
                <SystemInfo props={props}/>

                <div className='right-col'>
                    {memberDivs}
                </div>
                
                {/* footer */}
                <Footer>
                    <LogoutButton/>
                </Footer>
            </div>
        )
    }
}