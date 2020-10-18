import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Row, Table, Button, Spinner } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';

const UserProfileList = (props) => {
    const { users, auser, getAllUsers, getUserById} = useContext(UserProfileContext);
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;
    const history = useHistory();

    useEffect(() => {  
        getUserById(currentUser);
    }, []);

    useEffect(() => {
        getAllUsers();
    }, []);
    if (auser.userTypeId ===1) {
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
                                <td>                    <Button type="button"
                                className="editUserButton"
                                onClick={e => {
                                    history.push(`/user/${user.id}/edit`)
                                }}>Edit
                    </Button></td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>
        </div>
    )
}
else             return <Spinner className="app-spinner dark" />
}
export default UserProfileList;

