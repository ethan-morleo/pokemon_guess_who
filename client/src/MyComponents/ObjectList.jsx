import { Col, Container, Row } from "react-bootstrap";
import MyCard from "./MyCard";

function ObjectList(props){
    return (
        <Container style={{marginTop: '4rem'}}>
        <Row xs={2} md={4} lg={6}>
          { 
            props.list.map((o) =>{
                return(
                    <Col key={o.id}>
                    <MyCard object={o} updateName={props.updateName} updateShowFinalModal={props.updateShowFinalModal}/>
                </Col>
                );
            })}
        </Row>
        </Container>
      );
}

export default ObjectList;