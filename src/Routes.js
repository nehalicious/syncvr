import React, {Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Home from './Components/Home';
import OldRequests from "./Components/OldRequests";

const Routes = () => {
    const location = useLocation();

    return (
        <Suspense
            fallback={
                <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
                    <div className="w-50 mx-auto">
                        Please wait while we load your pages
                    </div>
                </div>
            }>
            <Switch>
                <Redirect exact from="/" to="/Home" />
                <Route
                    path={[
                        '/Home',
                        '/OldRequests'
                    ]}>
                    <Switch location={location} key={location.pathname}>
                        <Route path="/Home" component={Home}/>
                        <Route path="/OldRequests"component={OldRequests}/>
                    </Switch>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
