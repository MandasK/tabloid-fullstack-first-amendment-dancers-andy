import React, { useContext, useEffect } from 'react';
import { useHistroy, Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Row  } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';

const UserProfileList = (props) => {
    const { users, getAllUsers } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="container">
            <div>
                <div className="row justify-content-center">
                <h3>Users</h3>
                </div>
                <Row>
                {users.map((user) => (
                    <UserProfile key={user.id} user={user} />
                ))}
                </Row>
            </div>
        </div>
    )
}

export default UserProfileList;