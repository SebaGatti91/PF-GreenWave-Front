import Link from "next/link"
const Button = ({ link, text, className, style}) => {
    return(
        <Link href={link}>
            <button className={className} style={style}>
                {text}
            </button>
        </Link>
    )
}

export default Button