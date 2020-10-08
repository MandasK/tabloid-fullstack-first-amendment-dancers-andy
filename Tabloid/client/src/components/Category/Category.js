import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    return (
        <>
            <ListGroupItem>{category.name}</ListGroupItem>
            <Link to={`/category/${category.id}/delete`}><Button>Delete</Button></Link>
            <Link to={`/category/${category.id}/edit`}><Button>Edit</Button></Link>
        </>
    );
};

export default Category;