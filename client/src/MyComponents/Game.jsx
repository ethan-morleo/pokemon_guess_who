import {useContext, useEffect, useState } from "react";
import ObjectList from "./ObjectList";
import PokemonTrySelection from "./PokemonTrySelection";
import AnswerModal from "./Modals/AnswerModal";
import FinalModal from "./Modals/FinalModal";
import MyNavBar from "./MyNavBar";
import API from "../API";
import StopGameModal from "./Modals/StopGameModal";
import { Button, Col, Row } from "react-bootstrap";
import ErrorModal from "./Modals/ErrorModal";

function Game(props){
    const {list, id, updateResult, points, updatePoints, isGaming} = props;

    const [showanswerModal, setShowAnswerModal]=useState(false);
    const [showFinalModal, setShowFinalModal]=useState(false);
    const [name, setName]= useState();
    const [objectList, setObjectList] = useState(list);
    const [answer, setAnswer] = useState();
    const [property, setProperty] = useState(undefined);
    const [value, setValue] = useState(undefined);
    const [showStopModal, setShowStopModal] = useState(false);
    const [destination, setDestination] = useState('/');
    const [isLogOut, setIsLogout] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    function updateShowAnswerModal(value){setShowAnswerModal(value)}

    function updateShowFinalModal(value){setShowFinalModal(value)}

    function updateAnswerResult(value){setAnswer(value);}

    function updateProperty(value){setProperty(value);}

    function updateValue(value){ setValue(value)}

    function updateName(value){setName(value)}

    function updateDestination(value){setDestination(value)}

    function updateShowStopModal(){setShowStopModal((old)=>{return !old})}

    function updateIsLogOut(value){setIsLogout(value)}

    function updateShowErrorModal(value){setShowErrorModal(value)}

    function disableObjects(property, value, result){
        switch(property){
            case 'type':
                setObjectList((oldList)=>{
                return oldList.map((e)=>{
                if((e.type != value && result) || (e.type==value && !result)){
                    return Object.assign({}, e, {enable: false})
                }else{
                        return e
                    }
                })
            })
            break;
            case 'region':
                setObjectList((oldList)=>{
                    return oldList.map((e)=>{
                        if((e.region != value && result) || (e.region == value && !result)){
                            return Object.assign({}, e, {enable: false})
                        }else{
                            return e
                        }
                    })
                })
                break;
                case 'evolution':
                    setObjectList((oldList)=>{
                        return oldList.map((e)=>{
                            if((e.evolution != value && result) || (e.evolution==value && !result)){
                                return Object.assign({}, e, {enable: false})
                            }else{
                                return e
                            }
                        })
                    })
                    break;
                case 'isFourLegged':
                    setObjectList((oldList)=>{
                        return oldList.map((e)=>{
                            if((e.four_legged != value && result) || (e.four_legged==value && !result)){
                                return Object.assign({}, e, {enable: false})
                            }else{
                                return e
                            }
                        })
                    })
                    break;
            }    
    }
    let enableElements = objectList.filter((o)=>o.enable).length;
    return(
        <>
            <MyNavBar isGaming={isGaming} updateShowStopModal={updateShowStopModal} updateDestination={updateDestination} updateIsLogOut={updateIsLogOut} />
            
            <ObjectList list={objectList} updateName={updateName} updateShowFinalModal={updateShowFinalModal} />

            <PokemonTrySelection id={id} updateShowAnswerModal={updateShowAnswerModal} updateAnswerResult={updateAnswerResult} updateProperty={updateProperty} updateValue={updateValue} question={{property: property, value: value}} updatePoints={updatePoints} numberOfElement={enableElements} setShowErrorModal={updateShowErrorModal}/>
            <AnswerModal show={showanswerModal} updateShowAnswerModal={updateShowAnswerModal} disableObjects={disableObjects} result={answer} question={{property:property, value:value}} updateProperty={updateProperty} updateValue={updateValue}/>
            <FinalModal show={showFinalModal} updateShowFinalModal={updateShowFinalModal} gameId={id} name={name} updateResult={updateResult} points={points}/>
            <StopGameModal show={showStopModal} updateShow={updateShowStopModal} destination={destination} isLogOut={isLogOut}/>
            <ErrorModal show={showErrorModal} setShow={updateShowErrorModal} />
            <Row>
                <Col>
                    <Button variant="danger" size="lg" style={{marginTop: '3rem'}} onClick={()=>updateShowStopModal()}>BACK</Button>
                </Col>
            </Row>
        </>
        );
}

export default Game;