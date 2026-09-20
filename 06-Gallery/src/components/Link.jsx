import {useRouter} from '../hooks/useRouter.jsx'
export function Link({path,children,...props}) {
    const [_, navigateTo] = useRouter()
    return(
        <a onClick={(event)=>{
            event.preventDefault()
            navigateTo(path)}
        } {...props}>
            {children}
        </a>
    )
}