import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap'

export default function OldRequests() {
    const [loading, isLoading] = useState(true);
    const [requests, getRequests] = useState(null);

    useEffect(()=> {
        isLoading(true)
    }, []);

    return (
        <Container fluid style={{minHeight: '100vh', width: '100%'}}>
            <Row> Previous requests can be found below</Row>
        </Container>
    )
}