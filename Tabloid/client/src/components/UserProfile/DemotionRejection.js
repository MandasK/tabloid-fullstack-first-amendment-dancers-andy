import React from 'react';
import { Card,CardBody, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";
import './UserProfile.css';

const DemotionRejection = () => {
    return (
        <>
        <Card className="userProfileCard">
            <CardBody>

                <h3> You have tried to demote the last remaining administrator. Please promote another administrator first.</h3>
                <Link to= {`/user`} > <Button>Go Back</Button> </Link>
                         
            </CardBody>
        </Card>
        </>
    )
};

export default DemotionRejection;