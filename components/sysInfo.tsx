import dateFormat from "dateformat"
import { Props } from './types'
import React from "react"
import { Button } from '@chakra-ui/button'
import { Input, Tooltip, Textarea } from '@chakra-ui/react'
import Router from "next/router"

export default function SystemInfo({props} : { props: Props }) {
    let { name, avatar_url, banner, description, color, tag } = props.system
    const [state, setState] = React.useState({
        edit: false,
        name: name,
        description: description,
        tag: tag,
        avatar_url: avatar_url,
        banner: banner,
        color: color,
    })
    
    function setEdit(edit:boolean) {
        if (!edit) {
            setState({
                edit: edit,
                name: name,
                description: description,
                tag: tag,
                avatar_url: avatar_url,
                banner: banner,
                color: color,
            })
            return
        }
        
        setState({
            edit: edit,
            name: state.name,
            description: state.description,
            tag: state.tag,
            avatar_url: state.avatar_url,
            banner: state.banner,
            color: state.color,
        })
    }

    const editName = (event: { target: { value: any } }) => {
        setState({
            edit: state.edit,
            name: event.target.value,
            description: state.description,
            tag: state.tag,
            avatar_url: state.avatar_url,
            banner: state.banner,
            color: state.color,
        })
    }

    const editDesc = (event: { target: { value: any } }) => {
        setState({
            edit: state.edit,
            name: state.name,
            description: event.target.value,
            tag: state.tag,
            avatar_url: state.avatar_url,
            banner: state.banner,
            color: state.color,
        })
    }

    const editTag = (event: { target: { value: any } }) => {
        setState({
            edit: state.edit,
            name: state.name,
            description: state.description,
            tag: event.target.value,
            avatar_url: state.avatar_url,
            banner: state.banner,
            color: state.color,
        })
    }

    const editPfp = (event: { target: { value: any } }) => {
        setState({
            edit: state.edit,
            name: state.name,
            description: state.description,
            tag: state.tag,
            avatar_url: event.target.value,
            banner: state.banner,
            color: state.color,
        })
    }

    const editBanner = (event: { target: { value: any } }) => {
        setState({
            edit: state.edit,
            name: state.name,
            description: state.description,
            tag: state.tag,
            avatar_url: state.avatar_url,
            banner: event.target.value,
            color: state.color,
        })
    }

    const editColor = (event: { target: { value: any } }) => {
        setState({
            edit: state.edit,
            name: state.name,
            description: state.description,
            tag: state.tag,
            avatar_url: state.avatar_url,
            banner: state.banner,
            color: event.target.value,
        })
    }

    async function patchSystem(id:string, state: any) {
        const res = await fetch("/api/patchSystem", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, state:state }),
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
                break;
        }
        
    }

    return ( 
        !state.edit
        // Static
        ?
        <div className='left-col'>
            <div className="sys-buttons">
                <Button
                    onClick={() => {setEdit(true)}}
                    colorScheme= "teal"
                    w="24"
                    mt="4"
                >
                    Edit
                </Button>
            </div>
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
                    with {props.members.length} currently registered members
                </p>
            </div>
            <hr />
            <p>
                {props.system.description}
            </p>
        </div>

        // mutable
        :
        <div className='left-col edit'>
            <div className="sys-buttons">
                <Button
                    onClick={() => {setEdit(false); patchSystem(props.system.id, state)}}
                    colorScheme= "green"
                    w="24"
                    mt="4"
                >
                    Save
                </Button>
                <Button
                    onClick={() => {setEdit(false)}}
                    colorScheme= "red"
                    w="24"
                    mt="4"
                >
                    Cancel
                </Button>
            </div>
            <div className='sys-header'>
                <Tooltip label="Name"><Input placeholder="Name" value={state.name} onChange={editName}></Input></Tooltip>
                <Tooltip label="Tag"><Input placeholder="Tag" value={state.tag} onChange={editTag}></Input></Tooltip>
                <Tooltip label="Color"><Input placeholder="Color" value={state.color} onChange={editColor}></Input></Tooltip>
                <p>({props.system.id})</p>
                < img
                    className='sys-banner'
                    src={state.banner || "http://placehold.it/256x64"}
                    alt={`${props.system.name}'s banner image`}
                    style={state.color ? {borderColor: '#' + state.color} : {border: 0}}
                />
                <Tooltip label='Banner URL'><Textarea id="sys-banner" placeholder="Banner URL" value={state.banner} onChange={editBanner}></Textarea></Tooltip>
                < img
                    className='sys-pfp'
                    src={state.avatar_url || "http://placehold.it/128x128"}
                    alt={`${props.system.name}'s profile picture`}
                    style={state.color ? {borderColor: '#' + state.color} : {border: 0}}
                />
                <Tooltip label='Avatar URL'><Textarea placeholder="Avatar URL" value={state.avatar_url} onChange={editPfp}></Textarea></Tooltip>
            </div>
            <div className='sys-extra'>
                <p>
                    Created on {dateFormat(props.system.created, "dddd, mmmm dS, yyyy")}{" "}
                    at {dateFormat(props.system.created, "h:MM:ss TT")}{" "}
                    with {props.members.length} currently registered members
                </p>
            </div>
            <hr />
            <Tooltip label='Description'><Textarea id="sys-desc" placeholder="Description" value={state.description} onChange={editDesc}></Textarea></Tooltip>
        </div>
    )
}