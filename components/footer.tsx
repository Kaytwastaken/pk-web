import React from "react"

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
        <footer>
            <div id="version-info">
                <span id="version">v0.1.0</span>
                { " • " }
                <span>
                    <a onClick={toggleExpanded} id="todo-link">Todo</a>
                </span>
                {todoState.expanded ? 
                <div id="todo-info">
                    <h2>Todos in order of importance</h2>
                    <p>• Fix mobile</p>
                    <p>• Add proxy and privacy editing</p>
                    <p>• Add member creation/deletion</p>
                    <p>• API caching</p>
                    <p>• Add public information viewing</p>
                </div> : null}
            </div>
            <a className="footer-links" href="https://github.com/xSke/PluralKit">PluralKit by xSke on GitHub</a>
            {" | "}
            <a className="footer-links" href="https://github.com/greysdawn/pluralkit-web">Inspiration from Greysdawn's Plurakit Web</a>
            {" | "}
            <a className="footer-links" href="https://github.com/airrocket/pk-web">Source code</a>
            <div id="logout">
                {props.children}
            </div>
        </footer>
    )
}