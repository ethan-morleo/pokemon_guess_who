import {Card, Col, Container, Row } from "react-bootstrap";
function DifficultyList(props){
    const {updateDifficulty, handleShowModal} = props;

    function handleDifficultyChoosen(difficulty){
        updateDifficulty(difficulty);
        handleShowModal(true);
    }
    
    return(
    <>
        <Container>
            <h1>SCEGLI LA DIFFICOLTÁ</h1>
            <Row style={{marginTop: '3rem'}}>
                <Col>
                    <Card border="primary"  style={{cursor: 'pointer'}} onClick={()=>{handleDifficultyChoosen("FACILE")}}>
                        <Card.Header>FACILE</Card.Header>
                        <Card.Body>
                        <Card.Text>Scegliendo FACILE dovrai indovinare tra 12 oggetti</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="primary"  style={{cursor: 'pointer'}} onClick={()=>{handleDifficultyChoosen("MEDIA")}}>
                        <Card.Header>MEDIA</Card.Header>
                        <Card.Body>
                        <Card.Text>Scegliendo MEDIA dovrai indovinare tra 24 oggetti</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="primary"  style={{cursor: 'pointer'}} onClick={()=>{handleDifficultyChoosen("DIFFICILE")}}>
                        <Card.Header>DIFFICILE</Card.Header>
                        <Card.Body>
                        <Card.Text>Scegliendo DIFFICILE dovrai indovinare tra 36 oggetti</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    );
}

export default DifficultyList;