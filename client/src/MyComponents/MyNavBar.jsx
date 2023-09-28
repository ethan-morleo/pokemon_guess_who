import { useContext, useState } from "react";
import { Navbar, Container, Offcanvas, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../Contexts/UserContext";

function MyNavBar(props){
    const {isGaming, updateShowStopModal, updateDestination, updateIsLogOut} = props;
    const userContext = useContext(UserContext);
    const username = userContext.username;
    const updateUser = userContext.updateUser;
    const navigate = useNavigate()
    
    function handleGoBack(){
      if(isGaming){
        updateShowStopModal(true);
      }else{
        navigate('/');
      }

    }

    async function handleLogOut(){
      if(isGaming){
        updateDestination('/');
        updateIsLogOut(true);
        updateShowStopModal(true);
      }else{
            await API.logOut();
            updateUser('Guest');
            navigate('/');
      }
      
    }

  return(
  <>
    <Navbar bg="primary" data-bs-theme="dark" fixed="top" >
      <Container>
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={()=>handleGoBack()}>POLICHI?</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{cursor: 'pointer'}}>
          <UserFunctions username={username} handleLogOut={handleLogOut} navigate={navigate} isGaming={isGaming} updateShowStopModal={updateShowStopModal} updateDestination={updateDestination} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  </>
  )
}

function UserFunctions(props){
  const {username, handleLogOut, navigate, isGaming, updateShowStopModal, updateDestination} = props;
  function seePersonalPage(){
      if(isGaming){
        updateDestination(`/${username}/games`);
        updateShowStopModal(true);
      }else{
        navigate(`/${username}/games`)
      }
  }
  return(
    username!='Guest' ?
    <Dropdown>
    <Dropdown.Toggle size="lg" variant="outline-light"> {username} <PersonCircle /></Dropdown.Toggle>
    <Dropdown.Menu style={{ background: 'white', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', padding: '20px'}} >
      <Dropdown.Item onClick={()=>seePersonalPage()} style={{color: 'black',}}>I TUOI PUNTEGGI</Dropdown.Item>
      <Dropdown.Divider style={{color: 'black', backgroundColor: 'black'}} />
      <Dropdown.Item onClick={()=>handleLogOut()} style={{color:"black"}}>LOGOUT</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    :
    <></>
  )
}

export default MyNavBar;