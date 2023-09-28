import { useContext, useState } from "react";
import { Button, Container, Form, InputGroup, Modal, Nav, Row, Spinner} from "react-bootstrap";
import {EyeSlash, Eye, ArrowLeft } from "react-bootstrap-icons";

import API from '../API';
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
function MyLogin(props){
    const[email, setEmail] = useState('u1@polito.it');
    const [password, setPassword] = useState('ciao');
    const [showPassword, setShowPassword] = useState('password');
    const [errorMessage, setErrorMessage] = useState('') ;
    const [loginLoading, setLoginLoading] = useState(false)
    const userContext = useContext(UserContext);
    const updateUser = userContext.updateUser;
    const navigate = useNavigate();
    function handleShowPassword(){
        setShowPassword((oldValue)=> oldValue=='password' ? 'text' : 'password');
    }

    const doLogIn = (credentials) => {
        setLoginLoading(true)
        API.logIn(credentials)
          .then( user => {
            setErrorMessage('');
            updateUser(user.name)
            navigate('/');
          })
          .catch(err => {
            setErrorMessage('Wrong username or password');
          })
      }
      
      const handleSubmit = (event) => {
          event.preventDefault();
          setErrorMessage('');
          const username = email;
          const credentials = { username, password };
          doLogIn(credentials);
          
      };
    let eyeIcon = showPassword=='password' ? <EyeSlash /> : <Eye />

    return(
    <>
        <h1>LOGIN TO POLICHI?</h1>
        <Container style={{ borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', padding: '20px'}}>
            <LoginForm showPassword={showPassword} handleShowPassword={handleShowPassword} eyeIcon={eyeIcon} handleSubmit={handleSubmit} email={email} password={password} setEmail={setEmail} setPassword={setPassword} loginLoading={loginLoading}/>
        </Container>
        <LoginErrorModal errorMessage={errorMessage} setErrorMessage={setErrorMessage} setLoginLoading={setLoginLoading}/>
        <Button size="lg" variant="secondary" style={{marginTop: '3rem'}} onClick={()=>navigate('/')}><ArrowLeft /></Button>
    </>   
    )
}

function LoginForm(props){
    const {email, password, setEmail, setPassword, loginLoading} = props;
    let button = loginLoading ? <LoadingButton /> : <NormalButton email={email} password={password} />
    return(
    <>
      <Form onSubmit={props.handleSubmit}>
        <Row style={{marginTop: '20px'}}>
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                type="email"
                required
                isInvalid={email==''}
                value={email} onChange={ev => setEmail(ev.target.value)}
            />
            </InputGroup>
            </Row>
            <Row style={{marginTop: '20px'}}>
                <InputGroup>
                <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon2"
                    type={props.showPassword}
                    isInvalid={password==''}
                    value={password} onChange={ev => setPassword(ev.target.value)}
                />
                <InputGroup.Text id="basic-addon2" onClick={()=>props.handleShowPassword()} style={{cursor: 'pointer'}}>{props.eyeIcon}</InputGroup.Text>
                </InputGroup>
            </Row>
            <Row>
                {button}
            </Row>
          </Form>
        </>            
    );
}

function LoginErrorModal(props){
    return(
        <Modal show={props.errorMessage!=''} onHide={()=>{props.setErrorMessage(''); props.setLoginLoading(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>ERRORE LOGIN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Ops...username o password errati riprova
            </Modal.Body>
        </Modal>
    )
}

function NormalButton(props){
    const {email, password} = props
    return(
        <Button variant="primary" type="submit" style={{marginTop: '35px'}} disabled={email=='' || password==''}>LOG IN</Button>
    )
}

function LoadingButton(props){
    return(
        <Button variant="secondary" style={{marginTop: '35px'}} disabled={true}>
        <Spinner />
    </Button>
    )
}

export default MyLogin;