import React, {useState} from 'react';
import {Container, Row, Form, Button} from 'react-bootstrap'
import {db} from '../firebase'

export default function Home() {
    const [number, setNumber] = useState(1);
    const [error, displayError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(number);
        // or get the single doc from the collection
        db.collection("fibonacci")
            .doc(number)
            .get()
            .then(doc => {
                const data = doc.data();
                console.log(data);
            });
    };

    const handleChange = (input) => {
        displayError(false);
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

                    <Button onClick = {(e)=>handleSubmit(e)}variant="primary" type="submit">
                        Submit
                    </Button>
                    {error? <Form.Text> Please enter a positive number </Form.Text> : null}
                </Form>
            </Row>
        </Container>
    )
}