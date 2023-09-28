import Card from 'react-bootstrap/Card';

function MyImage(props){
  const {src} = props
  return(
    <img src={src}
    width="75rem"
    height="70rem"
    />
  )
}

function MyCard(props) {
  const {object} = props

  function handleClickOnCard(){
      props.updateName(object.name);
      props.updateShowFinalModal(true);
  }

  return (
    object.enable ?
    <Card border="primary" style={{ width: '13rem', cursor: 'pointer'}} onClick={()=>handleClickOnCard()} >
      <Card.Header>{object.name}</Card.Header>
      <Card.Body>
        <MyImage src={object.img}/>
      </Card.Body>
    </Card>
    :
    <Card bg="secondary" style={{ width: '13rem'}} >
      <Card.Header>{object.name}</Card.Header>
      <Card.Body>
        <MyImage src={object.img}/>
      </Card.Body>
    </Card>
  );
}

export default MyCard;