import { useState } from 'react';
import {Row, Col, Container, Button, Spinner, Dropdown} from 'react-bootstrap'
import API from '../API';

function PokemonTrySelection(props){
    const {id, updateShowAnswerModal,updateAnswerResult,updateProperty, updateValue, question, updatePoints, numberOfElement, setShowErrorModal} = props;
    const [isLoadingResponse, setIsLoadingResponse] = useState(false);
    const [selectedOption, setSelectedOption] = useState(undefined);
    const [selectedValue, setSelectedValue] = useState(undefined);

    let valueSelectionComponent;

    let buttonComponent;

      switch(question.property){
        case 'type':
            valueSelectionComponent = <TypeValueSelection onChangeValue={onChangeValue} selectedValue={selectedValue} value={question.value}/>;
            break;
        case 'region':
            valueSelectionComponent = <RegionValueSelection onChangeValue={onChangeValue} selectedValue={selectedValue} value={question.value}/>
            break;
        case 'evolution':
            valueSelectionComponent = <EvolutionValueSelection onChangeValue={onChangeValue} selectedValue={selectedValue} value={question.value}/>
            break;
        case 'isFourLegged' :
            valueSelectionComponent = <IsFourLeggedValueSelection onChangeValue={onChangeValue} selectedValue={selectedValue} value={question.value}/>
            break;
      }

      function onChangeProperty(e) {
        switch(e){
            case 'type':
                setSelectedOption('TIPO');
                break;
            case 'region':
                setSelectedOption('REGIONE');
                break;
            case 'evolution':
                setSelectedOption('EVOLUZIONE');
                break;
            case 'isFourLegged':
                setSelectedOption('QUATTRO ZAMPE?');
                break;
        }
        updateProperty(e);
        updateValue(undefined);
      }

      function onChangeValue(e) {
        if(question.property=='isFourLegged'){
            switch(e){
                case 'true':
                    setSelectedValue('SI');
                    break;
                case 'false':
                    setSelectedValue('NO');
                    break;
            }
        }else{
            setSelectedValue(e);
        }
        updateValue(e);
      }

      async function handleTryRequest(){
        setIsLoadingResponse(true);
        try{
            const result = await API.getAnswer(id,question.property,question.value);
            updateAnswerResult(result);
            updatePoints();
            setIsLoadingResponse(false);
            updateShowAnswerModal(true);
        }catch(err){
            setIsLoadingResponse(false);
            updateProperty(undefined);
            updateValue(undefined);
            setShowErrorModal(true);
        }
    }

      if (question.property && question.value){
        buttonComponent = <ButtonComponent handleTryRequest={handleTryRequest} isLoadingResponse={isLoadingResponse} />
      }

    return(

        numberOfElement>1 ?

        <Container style={{border: '2px solid blue', padding: '10px', marginTop: '1rem', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'}}>
            <Row className="d-flex align-items-center justify-content-center">
                <Col sm={4}>
                    <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '35px' }}>
                    FAI UNA DOMANDA: 
                    </h3>
                </Col>
                <Col sm={2}>
                    <Dropdown onSelect={(e)=>onChangeProperty(e)} style={{ width: 'auto' }}>
                        <Dropdown.Toggle>
                        {question.property ? selectedOption : 'Seleziona una proprietá'}
                        </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="type">TIPO</Dropdown.Item>
                        <Dropdown.Item eventKey="region">REGIONE</Dropdown.Item>
                        <Dropdown.Item eventKey="evolution">EVOLUZIONE</Dropdown.Item>
                        <Dropdown.Item eventKey="isFourLegged">A QUATTRO ZAMPE?</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col sm={2}>{valueSelectionComponent}</Col>
                <Col sm={4}>{buttonComponent}</Col>
            </Row>
        </Container>

        :

        <></>
    )
} 

function TypeValueSelection(props){
    return(
        <Dropdown style={{ width: 'auto' }} onSelect={(e)=>props.onChangeValue(e)}>
            <Dropdown.Toggle>{props.value ? props.selectedValue : 'SCEGLI IL VALORE'}</Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item eventKey="FUOCO">FUOCO</Dropdown.Item>
            <Dropdown.Item eventKey="ACQUA">ACQUA</Dropdown.Item>
            <Dropdown.Item eventKey="ERBA">ERBA</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
function RegionValueSelection(props){
    return(
        <Dropdown style={{ width: 'auto' }} onSelect={(e)=>props.onChangeValue(e)}>
            <Dropdown.Toggle>{props.value ? props.selectedValue : 'SCEGLI IL VALORE'}</Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item eventKey="JOHTO">JOHTO</Dropdown.Item>
            <Dropdown.Item eventKey="KANTO">KANTO</Dropdown.Item>
            <Dropdown.Item eventKey="SINNOH">SINNOH</Dropdown.Item>
            <Dropdown.Item eventKey="UNIMA">UNIMA</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function EvolutionValueSelection(props){
    return(
        <Dropdown style={{ width: 'auto' }} onSelect={(e)=>props.onChangeValue(e)}>
            <Dropdown.Toggle>{props.value ? props.selectedValue : 'SCEGLI IL VALORE'}</Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item eventKey="1">1</Dropdown.Item>
            <Dropdown.Item eventKey="2">2</Dropdown.Item>
            <Dropdown.Item eventKey="3">3</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function IsFourLeggedValueSelection(props){
    return(
        <Dropdown style={{ width: 'auto' }} onSelect={(e)=>props.onChangeValue(e)}>
            <Dropdown.Toggle>{props.value ? props.selectedValue : 'SCEGLI IL VALORE'}</Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item eventKey="true">SI</Dropdown.Item>
            <Dropdown.Item eventKey="false">NO</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function ButtonComponent(props){
    return(
        props.isLoadingResponse ?
        <Button variant='secondary' onClick={()=>props.handleTryRequest()}>
                <Spinner animation="grow" size='sm' />
        </Button>
        :
        <Button variant='success' onClick={()=>props.handleTryRequest()}>
                CHIEDI
        </Button>
    );
}

export default PokemonTrySelection;