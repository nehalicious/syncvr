import React, {useState} from 'react';
import {Container, Row, Form, Button} from 'react-bootstrap'

export default function Home() {
    const [number, setNumber] = useState(1);
    const [error, displayError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(number);

    };

    const handleChange = (input) => {
        displayError(false);
        if(input>0) {
            setNumber(input);
        } else displayError(true);
    };

    const headingStyle = {
        width: '100%',
        fontSize: '7.5vh',
        textAlign: 'center'
    }

    return (
        <Container fluid style={{minHeight: '100vh', width: '100%'}}>
            <Row className="p-5" style={headingStyle}> SyncVR Fibonacci Challenge</Row>
            <Row className="p-5">
                <Form>
                    <Form.Group controlId="formNumber">
                        <Form.Label>Which fibonacci number do you want to see</Form.Label>
                        <Form.Control onChange={e=>handleChange(e.target.value)} type="number" placeholder="Enter number" />
                    </Form.Group>

                    <Button onClick = {(e)=>handleSubmit(e)}variant="primary" type="submit">
                        Submit
                    </Button>
                    {error? <Form.Text> Please enter a positive number </Form.Text> : null}
                </Form>
            </Row>
            <Row className="p-5">
                <Button>
                    View past requests
                </Button>
            </Row>

        </Container>
    )
}