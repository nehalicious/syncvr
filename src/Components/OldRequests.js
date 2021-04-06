import React, {useEffect, useState} from 'react';
import {Container, Row, Button} from 'react-bootstrap'
import axios from 'axios';
import RequestBox from "./RequestBox";
import {useHistory} from 'react-router-dom';

/**
 * Page to display old requests made to the fibonacci api
 */
export default function OldRequests() {
    const [loading, isLoading] = useState(true);
    const [requests, setRequests] = useState(null);
    const [error, isError] = useState(false);
    const history=useHistory();

    /**
     * Get all previous requests from firebase api
     * Set loading to false when response is received from the server
     * Set error if status code is not 200
     */
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

    const headingStyle = {
        width: '100%',
        fontSize: '7.5vh',
        textAlign: 'center',
        fontWeight: 'bold',
        fontColor: '#4D3F3F'
    };

    return (
        <Container fluid style={{minHeight: '100vh', width: '100%'}}>
            <Row
                className="p-5 mx-auto"
                style={headingStyle}>
                Previous requests can be found below
            </Row>
            {loading?
                <Row
                    className="px-5">
                    Loading data, please wait
                </Row>
                :null}
            {!loading && error?
                <Row
                    className="px-5">
                    Your data could not be retreived at this time
                </Row>
                : null}
            {!loading && requests? requests.map(x=>
                <RequestBox
                    index={x.id}
                    value={x.value}
                    timestamp={x.access_time}/>
            ) : null}
            <Row
                className="p-5"
                style={{width: '100%'}}>
                <Button
                    style={{marginRight: 'auto', marginLeft: 'auto'}}
                    onClick = {()=>history.push('/Home')}>
                    Calculate new Fibonacci
                </Button>
            </Row>
        </Container>
    )
}