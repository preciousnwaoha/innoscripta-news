import "./Card.css"

interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Card = ({
    children,
    className = "",
    style = {},
}: CardProps) => {
    return (
        <div className={"card " + className} style={style}>
            {children}
        </div>
    )
}

export default Card