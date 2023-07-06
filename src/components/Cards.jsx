import { Card } from "react-bootstrap"

const ImageCard = () => {
    return(
        <Card style={{width: 192}}>
            <Card.Img style={{height: 128}} src='/assets/ImageTestPic.png' />
        </Card>
    )
}

export {ImageCard}