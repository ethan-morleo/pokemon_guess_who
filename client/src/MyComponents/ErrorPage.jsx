import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyNavBar from "./MyNavBar";

function ErrorPage(props){
    const navigate = useNavigate();
    return(
        <>
        <MyNavBar />
        <Container style={{ borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', padding: '20px'}}>
            <Row>
                <h1>ERRORE</h1>
            </Row>
            <Row style={{marginTop: '3rem'}}>
                <h2>Scusaci per un problema tecnico non puoi iniziare la partita, riprova</h2>
            </Row>
            <Row>
                <Col>
                    <Button size="lg" variant="primary" onClick={()=>navigate('/')}>GO HOME</Button>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default ErrorPage