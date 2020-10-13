import React, { useContext, useEffect } from 'react';
import { useHistroy, Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Row, Table } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';

const UserProfileList = (props) => {
    const { users, getAllUsers } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUsers();
    }, []);
    
    
    return (

        <div className="container">
            <div className="row justify-content-left">
                <div className="row justify-content-center">    
                    <h3>Users</h3>
                </div>
                <Table>

                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>User Type</th>
                        </tr>
                    </thead>

                    {users.map((user) => (
                        <tbody key={user.id}>
                            <tr>
                                <th scope="row">
                                    <Link to={`/user/${user.id}/details`}>
                                        {user.displayName}
                                    </Link>
                                </th>
                                <td>{user.fullName}</td>
                                <td>{user.userType.name}</td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>
        </div>
    )
}

export default UserProfileList;

