import React, {useState} from 'react';
import {Container, Row, Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

/**
 * Home Screen with option to enter a number 'n' and
 * calculate the nth number of the fibonacci series
 * @constructor
 */
export default function Home() {
    const [number, setNumber] = useState(1);
    const [error, displayError] = useState(false);
    const [serverError, displayServerError] = useState(false);
    const history = useHistory();
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://us-central1-syncvr-fc5d5.cloudfunctions.net/app/fibonacci/', {
            index: number
        }).then(res=>{
            if(res.status === 200) {setResult(res.data)}
            else{displayServerError(true)}
            }
        ).catch(e=>displayServerError(true))
    };

    const handleChange = (input) => {
        displayError(false);
        displayServerError(false);
        if(input>0) {
            setNumber(input);
        } else displayError(true);
    };

    const headingStyle = {
        width: '100%',
        fontSize: '7.5vh',
        textAlign: 'center',
        fontWeight: 'bold',
        fontColor: '#4D3F3F',
    };

    const alignCenter = {
        marginRight: 'auto',
        marginLeft: 'auto',
   };

    return (
        <Container fluid style={{minHeight: '100vh', width: '100%'}}>
            <Row className="p-5 mx-auto" style={headingStyle}>SyncVR Fibonacci Challenge</Row>
            <Row style={alignCenter} className="p-5">
                <Form>
                    <Form.Group controlId="formNumber">
                        <Form.Label>Which fibonacci number do you want to see</Form.Label>
                        <Form.Control onChange={e=>handleChange(e.target.value)} type="number" placeholder="Enter number" />
                    </Form.Group>

                    <Button style={alignCenter} onClick = {(e)=>handleSubmit(e)} variant="primary" type="submit">
                        Submit
                    </Button>
                    {error? <Form.Text> Please enter a positive number </Form.Text> : null}
                </Form>
            </Row>
            {result ? <Row> The fibonacci number is: {result.value} </Row>:null}
             {serverError ? <Row> We wouldn't get the server to worK properly :( You can still check the previous requests though </Row>:null}

            <Row style={{width: '100%'}} className="p-5">
                <Button
                    onClick={()=>{history.push('/OldRequests')}}>
                    View past requests
                </Button>
            </Row>

        </Container>
    )
}