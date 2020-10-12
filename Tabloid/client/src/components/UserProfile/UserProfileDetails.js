import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserProfileContext, userProfileContext } from "../../providers/UserProfileProvider";
import { Spinner, Card, CardImg, Button, CardBody, CardHeader } from 'reactstrap'

const UserProfileDetails = () => {
    const { getUserById, auser } = useContext(UserProfileContext);
    const [isloading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

   
   useEffect(() => {  
       getUserById(id).then(() => setIsLoading(true))
   }, [auser]);
   
   const date = new Date(auser.createDateTime)
   const betterDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    if(!auser) {
        return null;
    }
    if(isloading) {
        return(
            <div className="d-flex justify-content-center">
                <Card style={{ border: "none", width: "40%" }} className="smallContainer">

                    {
                        auser.imageLocation != null ? <CardImg style={{ height: "40%", width: "40%" }} src={auser.imageLocation} alt={auser.fullName} className="userdetailsImg" />
                        : <i className="fa-user-circle fa-7x" />
                    }
                    <CardHeader>
                        <h3>{auser.fullName}</h3>
                    </CardHeader>
                    <CardBody>
                        <div>Display Name: {auser.displayName}</div>
                        <div>Email: {auser.email}</div>
                        <div>Profile Type: {auser.userType.name}</div>
                        <div>Profile Created on {betterDate}</div>
                    </CardBody>
                    <Button type="button"
                                className="goBackuserButton"
                                onClick={e => {
                                    history.push("/user")
                                }}>Go Back
                    </Button>
                </Card>
            </div>
        )
    }
    else {
        return <Spinner className="app-spinner dark"/>
    }
}

export default UserProfileDetails;