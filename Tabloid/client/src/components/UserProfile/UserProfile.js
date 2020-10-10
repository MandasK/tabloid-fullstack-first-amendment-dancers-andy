import React from 'react';
import { Card,CardBody, CardTitle, CardText } from 'reactstrap';
import './UserProfile.css';

const UserProfile = ({user}) => {
    return (
        <>
        <Card className="userProfileCard">
            <CardBody>
                <CardTitle> 
                    <h6>Username: {user.displayName}</h6>
                    </CardTitle>
                <CardText>
                   Name: {user.fullName}
                    <br></br>
                    User Type: {user.userType.name}
                </CardText>
            </CardBody>
        </Card>
        </>
    )
};

export default UserProfile;