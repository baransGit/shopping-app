import {createPortal} from 'react-dom'
import {useEffect,useRef} from 'react'

interface PortalProps{
 
    children:React.ReactNode
}  

export const Portal = ({children}:PortalProps)=>{

    const containerRef = useRef<HTMLDivElement| null>(null)
   


    useEffect(()=>{
        let existingContainer = document.getElementById('portal-root') as HTMLDivElement
        containerRef.current =existingContainer || document.createElement('div')
        containerRef.current.id = 'portal-root'
        

        if(!existingContainer){
            document.body.appendChild(containerRef.current)
        }
        return () =>{
            if(!existingContainer && containerRef.current?.parentElement ){
                containerRef.current.parentElement?.removeChild(containerRef.current)
        }
    }
    },[])


        return containerRef.current ? createPortal(children,containerRef.current) : null
}
