import React from "react"
import ContentLoader from "react-content-loader"
import { usePathname } from "next/navigation"


const SkeletonCard = (props) =>{
    const pathname =usePathname()
    return(
        <div className=" flex items-start ">
    {pathname === "/store/buycart" ? (
<ContentLoader viewBox="0 0 700 220" height={200} width={700} {...props}>
<rect x="5" y="17" rx="5" ry="5" width="200" height="180" />
    <rect x="370" y="22" ry="2" rx="2" width="250" height="20"/>
    <rect x="450" y="50" ry="2" rx="2" width="90" height="20"/>
    <rect x="550" y="160" rx="10" ry="5" width="40" height="40" />
    <rect x="600" y="160" rx="8" ry="5" width="100" height="40" />
    <circle cx="690" cy="17" r="10" />
  
  </ContentLoader>
   ):(
    <ContentLoader viewBox="0 0 400 420" height={420} width={400} {...props}>
     <rect x="16" y="17" rx="2" ry="0" width="390" height="250" />
    <rect x="110" y="270" ry="2" rx="2" width="200" height="15"/>
    <rect x="190" y="290" ry="2" rx="2" width="50" height="15"/>
    <rect x="170" y="310" rx="2" ry="2" width="80" height="15" />
    <rect x="160" y="330" rx="8" ry="5" width="100" height="15" />
    <circle cx="280" cy="330" r="15"/>
  </ContentLoader>
   )}
    </div>
)
}
export default SkeletonCard

