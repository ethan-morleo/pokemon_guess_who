import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ChooseGame from './ChooseGame';
import MyNavBar from './MyNavBar';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
function Home(props){
    const {difficulty,updateElementList,updateGameId,updateDifficulty,setInitialPoints, updateIsGaming} = props;
    const navigate = useNavigate();
    const username = useContext(UserContext).username;
    function handleNewGame(){
        navigate('/newGame');
    }
    return(
        <>
        <MyNavBar />
        <Container style={{ borderRadius: '10px', boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', padding: '20px', marginTop: '3rem'}}>
            <Row className="justify-content-center">
                <Col>
                <Image 
                src='/pikachu.png' 
                 fluid 
                />
                </Col>
            </Row>
            <Row style={{marginTop: '3rem'}}>
            <h1>SCOPRI IL POKEMON MISTERIOSO</h1>
            </Row>
            <Row style={{marginTop: '3rem'}}>
                <ChooseGame difficulty={difficulty} updateElementList={updateElementList} updateGameId={updateGameId} updateDifficulty={updateDifficulty} setInitialPoints={setInitialPoints} updateIsGaming={updateIsGaming}/>
            </Row>
            
                {username!='Guest' ? <></> :
                    <Container style={{ marginTop: '3rem'}}>
                        <Row className="d-flex align-items-center justify-content-center">
                            <Col sm={8}>
                                <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                ACCEDI PER MEMORIZZARE LE TUE PARTITE 
                                </h3>
                            </Col> 
                            </Row>
                            <Row>
                            <Col>
                                <Button variant="outline-primary" onClick={()=>navigate('/login')} style={{marginBottom: '3rem'}} size='lg'>LOGIN</Button>
                            </Col>
                        </Row>
                    </Container>
                }
                   
        </Container>
        </>
        
    );
}
export default Home