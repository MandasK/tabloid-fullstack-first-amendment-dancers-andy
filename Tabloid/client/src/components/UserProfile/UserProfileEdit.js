import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { useParams, useHistory } from 'react-router-dom';
import { UserProfileContext, userProfileContext } from "../../providers/UserProfileProvider";
import { Spinner, Card, CardImg, Button, CardBody, CardHeader } from 'reactstrap'

const UserProfileDetails = () => {
    const { getUserById, currentUser, auser, users, updateUser, getAllUsers, getCurrentUser} = useContext(UserProfileContext);
    const [ userTypeId, setUserTypeId] = useState();
    const [isloading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    let canDemote = true;
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));
    

    useEffect(() => {  
        getCurrentUser(clientUser.firebaseUserId);
    }, []);

    useEffect(() => {
        getAllUsers();
    }, []);
    const adminCount = users.filter(user => {
        if(user.userTypeId === 1) {
            return user
        }
    }).length
    
    useEffect(() => {
        getUserById(id).then(() => setIsLoading(true))
    }, []);


    const date = new Date(auser.createDateTime)
    const betterDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    const saveUser = evt => {
        evt.preventDefault();
        const updatedUser = 
        {
            id : auser.id,
            displayName: auser.displayName,
            firstName: auser.firstName,
            lastName: auser.lastName,
            createDateTime:auser.createDateTime,
            userTypeId: parseInt(userTypeId),
            email: auser.email,
            firebaseUserId: auser.firebaseUserId,
            imageLocation: auser.imageLocation

        }

        if (adminCount === 1 && auser.id === currentUser.id && (updatedUser.userTypeId === 2 || updatedUser.userTypeId === 3)) {
            canDemote = false;
        }
        if (canDemote) {   
        updateUser(updatedUser).then(() => history.push(`/user`))
        }
        else {
            
            history.push(`/user/nodelete`)
        }
    }

    while (auser.status !== 404) {
        if (isloading && currentUser.userTypeId === 1) {
            return (
                <div className="d-flex justify-content-center">
                    <Helmet>
                        <title>Tabloid-Edit User {auser.fullName}</title>
                        <meta name="description" content="Tabloid user edit page" />
                    </Helmet>
                    <Card style={{ border: "none", width: "30%", height: "30%" }} className="smallContainer">

                        {
                            auser.imageLocation != null ? <CardImg src={auser.imageLocation} alt={auser.fullName} className="userdetailsImg" />
                                : <i className="fa-user-circle fa-7x" />
                        }
                        <CardHeader>
                            <h3>{auser.fullName}</h3>
                        </CardHeader>
                        <CardBody>
                            <div>Display Name: {auser.displayName}</div>
                            <div>Email: {auser.email}</div>
                            <div className="form-group">
                                Role: <select defaultValue={auser.userTypeId}
                                        id="userType"
                                        onChange={(e) => setUserTypeId(e.target.value)}
                                        >
                                    <option value="1" >Admin</option>
                                    <option value="2" >Author</option>
                                    <option value="3">Deactivated</option>
                                </select>

                            </div>

                            <div>Profile Created on {betterDate}</div>
                        </CardBody>
                        <div>
                            
                            <Button type="button"
                                className="goBackuserButton"
                                onClick={saveUser}>Save
                            </Button>

                            <Button type="button"
                                className="goBackuserButton"
                                onClick={e => {
                                    history.push("/user")
                                }}>Cancel
                    </Button>
                </div>
                    </Card>
                </div>
            )
        }

        else {
            return <Spinner className="app-spinner dark" />
        }

    }
}

export default UserProfileDetails;