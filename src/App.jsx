import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export default function App () {

    const [fact, setFact] = useState()
    const [imageUrl, setimageUrl] = useState()

    //para recuperar la cital al cargar la pagina
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const {fact} = data
            setFact(fact)
        })
    
    }, [])

    //Para recuperar la imagen cada vez que tenemos una nueva cita
    useEffect(() => {
        if (!fact) return
        const threeFirtsWords = fact.split(' ',3).join(' ')
        
        fetch (`https://cataas.com/cat/says/${threeFirtsWords}?size=50&color=red&json=true`)
        .then(res => res.json())
        .then(response  => {
            const { url } = response
            setimageUrl(url)
        })

    }, [fact])
    

    return (
        <main>
                <h1>App de gatos! </h1>
            <div>
                 {fact && <p>{fact}</p>} {/*// Renderizado condicional */}
                    {imageUrl && <img src={`${CAT_ENDPOINT_IMAGE_URL}${imageUrl}`} alt="cat" />}
            </div>
        </main>
    )
}
