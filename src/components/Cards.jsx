import { Card } from "react-bootstrap"

const ImageCard = ({src}) => {
    return(
        <Card style={{width: 192}}>
            <Card.Img style={{height: 128}} src={src} />
        </Card>
    )
}

export {ImageCard}