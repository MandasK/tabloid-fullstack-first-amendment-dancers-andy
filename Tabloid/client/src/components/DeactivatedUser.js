import React from 'react';
import { Card,CardBody, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";


const DeactivatedUser = () => {
    return (
        <>
        <Card className="userProfileCard">
            <CardBody>

                <h3> The account you tried to log in with has been deactivated. Please contact an administrator to be reactivated.</h3>
                <Link to= {`/`} > <Button>Go Back</Button> </Link>
                         
            </CardBody>
        </Card>
        </>
    )
};

export default DeactivatedUser