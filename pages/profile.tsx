import cookie from 'cookie'
import LogoutButton from '../components/logoutButton'
import { Image, Box, Input, Textarea, Button, Img } from '@chakra-ui/react'
import React from 'react'
import dateFormat from 'dateformat'

type SysPrivacy ={
    description_privacy: boolean
    member_list_privacy: boolean
    group_list_privacy: boolean
    front_privacy: boolean
    front_history_provacy: boolean
}

type System = {
    id: string
    uuid: string
    name: string
    description: string
    tag: string
    avatar_url: string
    banner: string
    color: string
    created: Date
    timezone: string
    privacy: SysPrivacy
}

type MemPrivacy = {
    visibility: boolean
    name_privacy: boolean
    description_privacy: boolean
    bithday_privacy: boolean
    pronoun_privacy: boolean
    avatar_privacy: boolean
    metadata_privacy: boolean
}

type ProxyTag = {
    prefix: string
    suffix: string
}

type Member = {
    id: string
    uuid: string
    name: string
    display_name: string
    color: string
    birthday: string
    pronouns: string
    avatar_url: string
    banner: string
    description: string
    created: Date
    proxy_tags: Array<ProxyTag>
    keep_proxy: boolean
    privacy: MemPrivacy
}

type Props = {
    token: string
    system: System
    members: Array<Member>
    // members: any
}

export async function getServerSideProps(context : any) {
    let parsedCookies
    try {
        parsedCookies = cookie.parse(context.req.headers.cookie)
    } catch (error) {
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

    // console.log(sys)
    // console.log(mem)
    
    return { 
        props: {
            token: parsedCookies.token,
            system: sys,
            members: mem,
        }
    }
}

export default function Home(props: Props) {
    // let router = useRouter()

    // For each member returned from the API call, construct a div with their information
    let memberDivs: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = []
    let memberProxies: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> = []
    if (props.members.constructor.name === "Array") {
        props.members.forEach((element) => {
            memberProxies = []
            memberDivs.push(
                <div className='member-div' key={element.uuid}>
                    <div className='member-header'>
                        <img
                            src={element.avatar_url || "http://placehold.it/128x128"}
                            alt={`${element.name}'s profile picture`}
                            style={{borderColor: "#" + element.color}}
                        />
                        <div>
                            <h1>{element.name}</h1>
                            <h3>{element.display_name}</h3>
                            <h3>Prns: {element.pronouns ? element.pronouns : "N/A"}</h3>
                            <h3>DOB: {element.birthday ? element.birthday : "N/A"}</h3>
                            <h3>({element.id})</h3>
                        </div>
                        <Button
                            bgColor = "teal.200"
                            w="24"
                            mr="4"
                        >
                            Edit
                        </Button>
                    </div>
                    <img
                        src={element.banner}
                        // alt={`${element.name}'s banner`}
                        style={element.banner ? {borderColor: '#' + element.color} : {border: 0}}
                    />
                    <hr />
                    <div className='mem-desc-proxy'>
                        <p id='mem-desc'>
                            {element.description}
                        </p>
                        <div id='mem-proxies'>
                            Proxies: <br />
                            {element.proxy_tags.forEach((proxy) => {
                                memberProxies.push(
                                    <p className='proxy' key={element.uuid + proxy.prefix + proxy.suffix}>
                                        {proxy.prefix} text {proxy.suffix}
                                    </p>
                                )
                            })}
                            {memberProxies}
                        </div>
                    </div>
                </div>
            )
        });
    } else {
        // router.push('/')
        console.log("ur dum")
        console.log(props.members)
    }

    // Return content
    return (
        <div className='profile-body'>
            <div className=''>
                {/* Sys left */}
                <div className='left-col'>
                    <div className='sys-header'>
                        <h1>{props.system.name} | {props.system.tag}</h1>
                        <p>({props.system.id})</p>
                        < img
                            className='sys-banner'
                            src={props.system.banner || "http://placehold.it/256x64"}
                            alt={`${props.system.name}'s banner image`}
                            style={{borderColor: "#" + props.system.color}}
                        />
                        < img
                            className='sys-pfp'
                            src={props.system.avatar_url || "http://placehold.it/128x128"}
                            alt={`${props.system.name}'s profile picture`}
                            style={{borderColor: "#" + props.system.color}}
                        />
                    </div>
                    <div className='sys-extra'>
                        <p>
                            Created on {dateFormat(props.system.created, "dddd, mmmm dS, yyyy")}{" "}
                            at {dateFormat(props.system.created, "h:MM:ss TT")}{" "}
                            with {props.members.length} registered members
                        </p>
                    </div>
                    <hr />
                    <p>
                        {props.system.description}
                    </p>
                </div>
            </div>
            
            <div className='right-col'>
                {memberDivs}
            </div>
            
            {/* footer */}
            <footer>
                <a className="footer-links" href="https://github.com/xSke/PluralKit">PluralKit by xSke on GitHub</a>
                {" | "}
                <a className="footer-links" href="https://github.com/greysdawn/pluralkit-web">Inspiration from Greysdawn's Plurakit Web</a>
                {" | "}
                <a className="footer-links" href="https://github.com/airrocket/pk-web">Source code</a>
                <div>
                    <LogoutButton />
                </div>
            </footer>
        </div>
    )
}