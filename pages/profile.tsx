import cookie from 'cookie'
import LogoutButton from '../components/logoutButton'
import { Image, Box, Input, Textarea, Button, Img } from '@chakra-ui/react'
import React from 'react'
import dateFormat from 'dateformat'
import { SysPrivacy, System, MemPrivacy, ProxyTag, Member, Props } from '../components/types'
// import Modal from 'react-modal'
import Link from 'next/link'

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
    // For each member returned from the API call, construct a div with their information
    let memberDivs: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = []
    let memberProxies: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> = []
    if (props.members.constructor.name === "Array") {
        props.members.forEach((element) => {
            function privacy(property:String) {
                if (property == "public") {return true} else return false
            }
            memberProxies = []
            // memberDivs.push(
            //     <div className='member-div' key={element.uuid}>
            //         <div className='member-header'>
            //             <img
            //                 src={element.avatar_url || "http://placehold.it/128x128"}
            //                 alt={`${element.name}'s profile picture`}
            //                 style={element.color ? {borderColor: '#' + element.color} : {border: 0}}
            //             />
            //             <div>
            //                 <h1>{element.name}</h1>
            //                 <h3>{element.display_name}</h3>
            //                 <h3>Prns: {element.pronouns ? element.pronouns : "N/A"}</h3>
            //                 <h3>DOB: {element.birthday ? element.birthday : "N/A"}</h3>
            //                 <h3>({element.id})</h3>
            //             </div>
            //             <Button
            //                 bgColor = "teal.200"
            //                 w="24"
            //                 mr="4"
            //             >
            //                 <Link
            //                     href="/profile/edit"
            //                     as=""
            //                 >

            //                 </Link>
            //             </Button>
            //         </div>
            //         <img
            //             src={element.banner}
            //             style={element.banner ? {borderColor: '#' + element.color} : {border: 0}}
            //         />
            //         <hr />
            //         <div className='mem-etc'>
            //             <p id='mem-desc'>
            //                 {element.description}
            //             </p>
            //             <div> {/* Proxies and Privacy */}
            //                 <div id='mem-proxies'>
            //                     Proxies:
            //                     {element.proxy_tags.forEach((proxy) => {
            //                         memberProxies.push(
            //                             <p className='proxy' key={element.uuid + proxy.prefix + proxy.suffix}>
            //                                 {proxy.prefix} text {proxy.suffix}
            //                             </p>
            //                         )
            //                     })}
            //                     {memberProxies}
            //                 </div>
            //                 <div id='mem-priv'>
            //                     Member privacy settings <br />
            //                     (Checked is public):
                                
            //                     <span><input type="checkbox" checked={privacy(element.privacy.visibility)} disabled={true} name="vis" id="vis" />
            //                     <label htmlFor="vis"> Member visibility</label></span>
                                
            //                     <span> <input type="checkbox" checked={privacy(element.privacy.name_privacy)} disabled={true} name="name" id="name" />
            //                     <label htmlFor="name"> Member name</label></span>
                                
            //                     <span><input type="checkbox" checked={privacy(element.privacy.description_privacy)} disabled={true} name="desc" id="desc" />
            //                     <label htmlFor="desc"> Member description</label></span>
                                
            //                     <span><input type="checkbox" checked={privacy(element.privacy.bithday_privacy)} disabled={true} name="dob" id="dob" />
            //                     <label htmlFor="dob"> Member birthday</label></span>
                                
            //                     <span><input type="checkbox" checked={privacy(element.privacy.pronoun_privacy)} disabled={true} name="prn" id="prn" />
            //                     <label htmlFor="prn"> Member pronouns</label></span>
                                
            //                     <span><input type="checkbox" checked={privacy(element.privacy.avatar_privacy)} disabled={true} name="pfp" id="pfp" />
            //                     <label htmlFor="pfp"> Member avatar</label></span>
                                
            //                     <span><input type="checkbox" checked={privacy(element.privacy.metadata_privacy)} disabled={true} name="meta" id="meta" />
            //                     <label htmlFor="meta"> Member metadata</label></span>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // )
        });
    } else {
        // router.push('/')
        console.log("ur dum")
        console.log(props.members)
    }

    // Return content
    return (
        <>
            <div>
                {/* Sys left */}
                <div className='left-col'>
                    <div className='sys-header'>
                        <h1>{props.system.name} | {props.system.tag}</h1>
                        <p>({props.system.id})</p>
                        < img
                            className='sys-banner'
                            src={props.system.banner || "http://placehold.it/256x64"}
                            alt={`${props.system.name}'s banner image`}
                            style={props.system.color ? {borderColor: '#' + props.system.color} : {border: 0}}
                        />
                        < img
                            className='sys-pfp'
                            src={props.system.avatar_url || "http://placehold.it/128x128"}
                            alt={`${props.system.name}'s profile picture`}
                            style={props.system.color ? {borderColor: '#' + props.system.color} : {border: 0}}
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
        </>
    )
}