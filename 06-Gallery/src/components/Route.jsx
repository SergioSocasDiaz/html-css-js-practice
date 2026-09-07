export function Route({path,component,...props}){
    if (path === window.location.pathname){
        const Component = component
        return <Component {...props}/>
    }
    return null
}