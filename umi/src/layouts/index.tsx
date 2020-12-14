import React from "react"
const Layout = (props: any) => {
    console.log("layouts props===", props)
    return (
        <div>
            <div>layouts:</div>
            <div>{props.children}</div>
        </div>
    )
}
export default Layout