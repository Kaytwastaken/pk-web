export type SysPrivacy ={
    description_privacy: string
    member_list_privacy: string
    group_list_privacy: string
    front_privacy: string
    front_history_provacy: string
}

export type System = {
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

export type MemPrivacy = {
    visibility: string
    name_privacy: string
    description_privacy: string
    bithday_privacy: string
    pronoun_privacy: string
    avatar_privacy: string
    metadata_privacy: string
}

export type ProxyTag = {
    prefix: string
    suffix: string
}

export type Member = {
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

export type Props = {
    token: string
    system: System
    members: Array<Member>
}