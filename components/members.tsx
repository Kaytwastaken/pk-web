import { Button } from '@chakra-ui/button'
import { Input, Tooltip, Textarea } from '@chakra-ui/react'
import { Member } from './types'
import { ConstructPrivacy } from '../components/privacy'
import { ConstructProxies } from '../components/proxies'
import React from 'react'
import Router from 'next/router'

export function constructDiv(element:Array<Member>) {
    let { name, display_name, pronouns, birthday, avatar_url, banner, description, color } = element[1]
    const [state, setState] = React.useState({
        edit: false,
        name: name,
        displayname: display_name,
        pronouns: pronouns,
        birthday: birthday,
        avatar_url: avatar_url,
        banner: banner,
        description: description,
        color: color,
    })

    async function patchMember() {
        setState({
            edit: false,
            name: name,
            displayname: display_name,
            pronouns: pronouns,
            birthday: birthday,
            avatar_url: avatar_url,
            banner: banner,
            description: description,
            color: color,
        })

        const res = await fetch("/api/patchMember", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: element[1].id, state:state }),
        })
        
        let response = await res.json()
        switch (response.code) {
            case 1:
                console.error("Fetch error with code 401 due to blank token cookie. Redirecting to /index...");
                Router.push('/')
                break;
            case 2:
                console.error(`API returned error 0, equivalent to 500, 400, 401
                    (See https://pluralkit.me/api/errors/#json-error-codes).
                    This is likely due to malformed input data.`);
                break;
            default:
                console.log("Fetch 200 OK");
                Router.reload()
                break;
        }
        
    }

    function setEdit(edit:boolean) {
        if (!edit) {
            setState({
                edit: edit,
                name: name,
                displayname: display_name,
                pronouns: pronouns,
                birthday: birthday,
                avatar_url: avatar_url,
                banner: banner,
                description: description,
                color: color,
            })
            return
        }
        
        setState({
            edit: edit,
            name: state.name,
            displayname: state.displayname,
            pronouns: state.pronouns,
            birthday: state.birthday,
            avatar_url: state.avatar_url,
            banner: state.banner,
            description: state.description,
            color: state.color,
        })
    }

    const editName = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            name: event.target.value,
            
            displayname: state.displayname,
            pronouns: state.pronouns,
            birthday: state.birthday,
            avatar_url: state.avatar_url,
            banner: state.banner,
            description: state.description,
            color: state.color,
        })
    }
    
    const editDisplay = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            displayname: event.target.value,
            
            name: state.name,
            pronouns: state.pronouns,
            birthday: state.birthday,
            avatar_url: state.avatar_url,
            banner: state.banner,
            description: state.description,
            color: state.color,
        })
    }
    
    const editPronouns = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            pronouns: event.target.value,

            name: state.name,
            displayname: state.displayname,
            birthday: state.birthday,
            avatar_url: state.avatar_url,
            banner: state.banner,
            description: state.description,
            color: state.color,
        })
    }

    const editBirthday = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            birthday: event.target.value,

            name: state.name,
            displayname: state.displayname,
            pronouns: state.pronouns,
            avatar_url: state.avatar_url,
            banner: state.banner,
            description: state.description,
            color: state.color,
        })
    }
    
    const editPfp = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            avatar_url: event.target.value,

            name: state.name,
            displayname: state.displayname,
            pronouns: state.pronouns,
            birthday: state.birthday,
            banner: state.banner,
            description: state.description,
            color: state.color,
        })
    }
    
    const editBanner = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            banner: event.target.value,

            name: state.name,
            displayname: state.displayname,
            pronouns: state.pronouns,
            birthday: state.birthday,
            avatar_url: state.avatar_url,
            description: state.description,
            color: state.color,
        })
    }
    
    const editDesc = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            description: event.target.value,
            
            name: state.name,
            displayname: state.displayname,
            pronouns: state.pronouns,
            birthday: state.birthday,
            avatar_url: state.avatar_url,
            banner: state.banner,
            color: state.color,
        })
    }

    const editColor = (event: { target: { value: any } }) => {
         
        setState({
            edit: state.edit,
            color: event.target.value,
            
            name: state.name,
            displayname: state.displayname,
            pronouns: state.pronouns,
            birthday: state.birthday,
            avatar_url: state.avatar_url,
            banner: state.banner,
            description: state.description,
        })
    }

    let memberPrivacy = ConstructPrivacy(element)
    let memberProxies = ConstructProxies(element)

    return(
        !state.edit
        // Static fields 
        ?
        <div className='member-div' key={element[1].uuid}>
            <div className='member-header'>
                <img
                    src={state.avatar_url || "http://placehold.it/128x128"}
                    alt={`${state.name}'s profile picture`}
                    style={state.color ? {borderColor: '#' + state.color} : {border: 0}}
                />
                <div>
                    <h1>{state.name}</h1>
                    <h3>{state.displayname ? state.displayname : "N/A"}</h3>
                    <h3>Prns: {state.pronouns ? state.pronouns : "N/A"}</h3>
                    <h3>DOB: {state.birthday ? state.birthday : "N/A"}</h3>
                    <h3>({element[1].id})</h3>
                </div>
                <Button
                    onClick={() => {setEdit(true)}}
                    colorScheme= "teal"
                    w="24"
                    mr="4"
                >
                    Edit
                </Button>
            </div>
            <img
                src={state.banner}
                style={state.banner ? {borderColor: '#' + state.color} : {border: 0}}
            />
            <hr />
            <div className='mem-etc'>
                <p id='mem-desc'>
                    {state.description}
                </p>
                <div> {/* Proxies and Privacy */}
                    <div id='mem-proxies'>
                        Proxies:
                        {memberProxies}
                    </div>
                    {memberPrivacy}
                </div>
            </div>
        </div>
        
        // Editable fields
        :
        <div className='member-div' key={element[1].uuid}>
            <div className='member-header edit'>
                {/* PFP and URL */}
                <div className='pfp-url'>
                    <img
                        src={state.avatar_url || "http://placehold.it/128x128"}
                        alt={`${state.name}'s profile picture`}
                        style={state.color ? {borderColor: '#' + state.color} : {border: 0}}
                    />
                    <span><Tooltip label='Avatar URL'><Textarea placeholder='Avatar URL' value={state.avatar_url} onChange={editPfp}></Textarea></Tooltip></span>
                </div>
                
                {/* Name, pronouns, etc */}
                <div className='name-etc'>
                    <Tooltip label="Name"><Input placeholder="Name" value={state.name} onChange={editName}></Input></Tooltip>
                    <Tooltip label="Display name"><Input placeholder="Display name" value={state.displayname} onChange={editDisplay}></Input></Tooltip>
                    <Tooltip label="Pronouns"><Input placeholder="Pronouns" value={state.pronouns} onChange={editPronouns}></Input></Tooltip>
                    <Tooltip label="Birthday"><Input placeholder="Birthday [yyyy]-mm-dd" value={state.birthday} onChange={editBirthday}></Input></Tooltip>
                    <Tooltip label="Color"><Input placeholder="Color" value={state.color} onChange={editColor}></Input></Tooltip>
                    <h3>({element[1].id})</h3>
                </div>
                
                <div className='buttons'>
                    <Button
                        onClick={() => {patchMember()}}
                        colorScheme= "green"
                        w="24"
                        mr="4"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setEdit(false)}
                        colorScheme= "red"
                        w="24"
                        mr="4"
                    >
                        Cancel
                    </Button>
                </div>
            
            </div>
            
            {/* Banner and URL */}
            <div className='banner-url'>
                <img
                    src={state.banner}
                    style={state.banner ? {borderColor: '#' + state.color} : {border: 0}}
                />
                <Tooltip label='Banner URL'><Textarea placeholder='Banner URL' value={state.banner} onChange={editBanner}></Textarea></Tooltip>
            </div>
            <hr />
            
            {/* Desc, prox, priv */}
            <div className='mem-etc'>
                <Textarea placeholder='Description' value={state.description} onChange={editDesc}></Textarea>
                <div> {/* Proxies and Privacy */}
                    <Tooltip label="Coming soon! 😭">
                        <div id='mem-proxies'>
                            Proxies:
                            {memberProxies}
                        </div>
                    </Tooltip>
                    <Tooltip label="I promise it's coming soon jhbfdg">
                        {memberPrivacy}
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}