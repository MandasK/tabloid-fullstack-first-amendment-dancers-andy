import React from 'react';
import { ListGroupItem } from 'reactstrap';

const Category = ({ category }) => {
    return (
        <ListGroupItem>{category.name}</ListGroupItem>
    );
};

export default Category;