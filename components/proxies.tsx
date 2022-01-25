import { Member } from './types'

let proxies: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> = []

export function ConstructProxies(element:Array<Member>) {

    proxies = []

    element[1].proxy_tags.forEach((proxy) => {
        proxies.push(
            <p className='proxy' key={element[1].uuid + proxy.prefix + proxy.suffix}>
                {proxy.prefix} text {proxy.suffix}
            </p>
        )
    })

    return proxies

}