import { useState, useEffect, useContext } from "react"
import { Row, Col, Container, Table, Button, Spinner } from "react-bootstrap"
import { ArrowLeft } from "react-bootstrap-icons"
import API from "../API"
import { useNavigate } from "react-router-dom"
import UserContext from "../Contexts/UserContext"

function PersonalPage(props){
    const [gamesList, setGamesList] = useState([])
    const [totalPoints, setTotalPoints] = useState();
    const [loadingData, setLoadingData] = useState(true);
    const navigate= useNavigate();
    const userContext = useContext(UserContext);
    const username = userContext.username;
    const updateUser = userContext.updateUser;
    
    useEffect( () => {
        async function getGamesList(){
          const response= await API.getGames();
          setGamesList(response.list);
          setTotalPoints(response.total);
        }
        async function checkLogin(){
            const userInfo = await API.getUserInfo();
            if (userInfo.username!='Guest'){
                updateUser(userInfo.name);
            }
        }
        checkLogin();
        getGamesList();
        setLoadingData(false);
      }, [])

      async function handleLogOut(){
        await API.logOut();
        updateUser('Guest');
        navigate('/');
      }
      
    return(
      loadingData ? <Spinner size="lg" />
      :
      <>
      <Row className="justify-content-center">
        <Col>
        <h1>{username.toUpperCase()} ECCO LE TUE PARTITE: </h1>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{marginTop: '3rem'}}>
        <Col><h2>PUNTEGGIO TOTALE: {totalPoints}</h2></Col>
      </Row>
      <Row>
      <Container style={{ borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', padding: '20px'}}>
        <Table responsive >
        <thead>
        <tr>
          <th>DIFFICOLTÁ</th>
          <th>ELEMENTO SEGRETO</th>
          <th>PUNTI</th>
          <th>DATA</th>
        </tr>
      </thead>
      <tbody>
      {gamesList.map((o)=>{
        return(
          <MyTableRow object={o} key={o.id}/>
        )
      })}
        </tbody>
        </Table>
        </Container>
      </Row>
        <Row>
          <Col>
          <Button size="lg" onClick={()=>navigate('/')} style={{marginTop: '3rem'}}> <ArrowLeft /></Button>
          </Col>
          <Col>
          <Button variant="secondary" size="lg" onClick={()=>handleLogOut()} style={{marginTop: '3rem'}}> LOGOUT</Button>
          </Col>
        </Row>
      </>
    )
}

function MyTableRow(props){
  const {object} = props
  return(
    <tr>
          <td>{object.difficulty}</td>
          <td>{object.secret}</td>
          <td>{object.points}</td>
          <td>{object.date}</td>
        </tr>
  )
}

export default PersonalPage;