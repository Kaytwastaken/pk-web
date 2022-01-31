import React from "react"
import styles from './footer.module.css'

export default function Footer(props: any) {
    const [todoState, setState] = React.useState({
        expanded: false
    })

    function toggleExpanded() {
        setState({
            expanded: !todoState.expanded
        })
    }
    
    return (
        <footer className={styles.footer}>
            <div className={styles.version}>
                <span id="version">v0.1.0</span>
                { " • " }
                <span>
                    <a onClick={toggleExpanded} id={styles.todoLink}>Todo</a>
                </span>
                {todoState.expanded ? 
                <div className={styles.todoInfo}>
                    <h2>Todos in order of importance</h2>
                    <p>• Fix mobile</p>
                    <p>• Add proxy and privacy editing</p>
                    <p>• Add member creation/deletion</p>
                    <p>• API caching</p>
                    <p>• Add public information viewing</p>
                </div> : null}
            </div>
            <a className="footer-links" href="https://github.com/xSke/PluralKit">PluralKit by xSke</a>
            {" | "}
            <a className="footer-links" href="https://github.com/greysdawn/pluralkit-web">Inspired by Greysdawn's Pluralkit Web</a>
            {" | "}
            <a className="footer-links" href="https://github.com/Spectralitree/pk-webs">Also see pk-webs by Spectralitree</a>
            {" | "}
            <a className="footer-links" href="https://github.com/airrocket/pk-web">Source code</a>
            <div id={styles.logout}>
                {props.children}
            </div>
        </footer>
    )
}