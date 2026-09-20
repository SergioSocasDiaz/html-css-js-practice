import {Link} from '../components/Link.jsx'
import {HeroCampaign} from '../components/HeroCampaign.jsx'
import { useEffect, useState } from 'react'
export function PrincipalPage() {
    
    const [mainData, setMainData] = useState(null)
    useEffect(()=>{
        const fetchProduct = async () => {
            await fetch('/heroCampaignMock.json')
            .then(res => res.json()).then(data => setMainData(data))
        }

        fetchProduct()
    },[])

    
    return(
        <>
            <HeroCampaign product={mainData?.hero}/>
        </>
        
    )
}
