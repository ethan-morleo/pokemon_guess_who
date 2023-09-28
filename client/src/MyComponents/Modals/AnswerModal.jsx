import { Button, Modal } from "react-bootstrap";

function AnswerModal(props){
    const {show, updateShowAnswerModal, disableObjects,result,question, updateValue, updateProperty} = props;

    function handleCLick(){
        updateProperty(undefined);
        updateValue(undefined);
        disableObjects(question.property, question.value, result);
        updateShowAnswerModal(false)
    }

    return( 
        result ?
        <Modal show={show}>
            <Modal.Header style={{border: '1px solid green'}}>
                    <Modal.Title>RISULTATO DOMANDA</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{border: '1px solid green'}}>SI, PROPRIETÁ CORRETTA</Modal.Body>
                <Modal.Footer style={{border: '1px solid green'}}>
                    <Button variant="primary" onClick={()=>handleCLick()}>OK</Button>
                </Modal.Footer>
        </Modal>
        :
        <Modal show={show}>
            <Modal.Header style={{border: '1px solid red'}}>
                    <Modal.Title>RISULTATO DOMANDA</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{border: '1px solid red'}}>NO, PROPRIETÁ NON CORRETTA</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>handleCLick()}>OK</Button>
                </Modal.Footer>
        </Modal>
    )  
}

export default AnswerModal;