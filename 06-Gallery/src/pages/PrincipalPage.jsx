import {HeroCampaign} from '../components/HeroCampaign.jsx'
import { useEffect, useState } from 'react'
import {SeasonExpo} from '../components/SeasonExpo.jsx'
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
            <SeasonExpo products={mainData?.showcase}/>
        </>
        
    )
}
