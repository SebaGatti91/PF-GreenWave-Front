import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonCard = (props) => (
<ContentLoader viewBox="0 0 500 420" height={420} width={400} {...props}>
    <rect x="16" y="17" rx="2" ry="0" width="390" height="250" />
    <rect x="110" y="270" ry="2" rx="2" width="200" height="15"/>
    <rect x="190" y="290" ry="2" rx="2" width="50" height="15"/>
    <rect x="170" y="310" rx="2" ry="2" width="80" height="15" />
    <rect x="160" y="330" rx="8" ry="5" width="100" height="15" />
    <circle cx="280" cy="330" r="15"/>
  </ContentLoader>
)

export default SkeletonCard

