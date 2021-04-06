import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap'
import axios from 'axios';
import SimpleDateTime  from 'react-simple-timestamp-to-date';

export default function OldRequests() {
    const [loading, isLoading] = useState(true);
    const [requests, setRequests] = useState(null);
    const [error, isError] = useState(false);

    const getRequests = async() => {
        isError(false)
        axios.get("https://us-central1-syncvr-fc5d5.cloudfunctions.net/app/requests")
            .then(res=>
                {
                    console.log(res.body);
                    if(res.status === 200) {setRequests(res.data); }
                    else {isError(true)}
                    isLoading(false)
                }
            ).catch(e=>{
            isLoading(false);
            isError(true);
        })
    };

    useEffect(()=> {
        isLoading(true)
        getRequests();
    }, []);

    const getReqRows = (x) => {
        return (
            <>
                <Row>
                    Fibonacci number {x.value+1} = {x.value}
                </Row>
                <Row>
                    <p>Time of access:</p>
                    <SimpleDateTime dateSeparator="-" format="MYD" timeSeparator=":" meridians="1">{x.access_time._seconds}</SimpleDateTime>
                </Row>
            </>
        )
    }

    return (
        // <h1>Wtf</h1>
        <Container fluid style={{minHeight: '100vh', width: '100%'}}>
            <Row> Previous requests can be found below</Row>
            {!loading && error? <Row>Your data could not be retreived at this time</Row> : null}
            {!loading && requests? requests.map(x=>getReqRows(x)) : null}
        </Container>
    )
}