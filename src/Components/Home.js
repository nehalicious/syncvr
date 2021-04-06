import React, {useState} from 'react';
import {Container, Row, Form, Button} from 'react-bootstrap'

export default function Home() {
    const [number, setNumber] = useState(1);
    const [error, displayError] = useState(false)

    const handleSubmit = () => {

    };

    const handleChange = (input) => {
        displayError(false);
        console.log(input);
        if(input>0) {
            setNumber(input);
        } else displayError(true);
    }

    return (
        <Container fluid>
            <Row> SyncVR Fibonacci Challenge</Row>
            <Row>
                <Form>
                    <Form.Group controlId="formNumber">
                        <Form.Label>Which fibonacci number do you want to see</Form.Label>
                        <Form.Control onChange={e=>handleChange(e.target.value)} type="number" placeholder="Enter number" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {error? <Form.Text> Please enter a positive number </Form.Text> : null}
                </Form>
            </Row>
        </Container>
    )
}