import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import MyNavBar from "./MyNavBar";
import UserContext from "../Contexts/UserContext";

function Final(props){
    const {result, points} = props
    
    const userContext = useContext(UserContext);
    const username = userContext.username;
    const updateUser = userContext.updateUser;
    const navigate = useNavigate();

    const gamePoints = points<0 ? 0 : points-1;

    function newGame(){
        navigate('/')
    }
    
    async function goHomeAndLogout(){
        await API.logOut();
        updateUser('Guest');
        navigate('/');
    }

    let component = result ? <Win points={gamePoints} newGame={newGame} goHome={goHomeAndLogout} username={username}/> : <Lose newGame={newGame} goHome={goHomeAndLogout} username={username}/>
    return(
        <>
         <MyNavBar/>
        {component}
        </>
    );
}

function Win(props){
    const {username} = props
    return(
        <Container style={{ borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', padding: '20px'}}>
            <Row>
                <h1>HAI VINTO</h1>
            </Row>
            <Row style={{marginTop: '3rem'}}>
            <h3>COMPLIMENTI HAI OTTENUTO {props.points} PUNTI</h3>
            </Row>
            <Row className="d-flex align-items-center justify-content-center">
                <Col>
                <Image src="/dragonite.png"/>
                </Col>
                <Col>
            <Button onClick={()=>props.newGame()}>NUOVA PARTITA</Button>
                </Col>
                {username!='Guest' ?
                    <Col>
                        <Button onClick={()=>props.goHome()}>LOGOUT</Button>
                    </Col>
                :
                <></>
            } 
            </Row>
        </Container>
    )
}

function Lose(props){
    const {username} = props
    return(
        <Container style={{ borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', padding: '20px'}}>
            <Row>
                <h1>HAI PERSO</h1>
            </Row>
            <Row style={{marginTop: '3rem'}}>
                <h3>PECCATO, NON DEMORDERE E RIPROVA</h3>
            </Row>
            <Row className="d-flex align-items-center justify-content-center">
                <Col>
                    <Image src="/mew.png"/>
                </Col>
                <Col>
                    <Button onClick={()=>props.newGame()}>NUOVA PARTITA</Button>
                </Col>
                {username!='Guest' ?
                    <Col>
                        <Button onClick={()=>props.goHome()}>LOGOUT</Button>
                    </Col>
                :
                <></>
            } 
            </Row>
        </Container>
    )
}

export default Final;