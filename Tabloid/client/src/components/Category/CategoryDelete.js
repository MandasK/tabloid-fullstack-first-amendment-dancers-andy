import React, { useEffect, useContext, useState } from "react";
import { CategoryContext } from '../../providers/CategoryProvider';
import { useParams, useHistory } from 'react-router-dom';
import Category from './Category';
import { Button } from 'reactstrap';

const CategoryDelete = () => {
    const [category, setCategory] = useState();
    const { getById, deleteCategory } = useContext(CategoryContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getById(id).then(setCategory);
    }, []);

    const handleDelete = (id) => {
        deleteCategory(category.id)
            .then(() => history.push("/category"))

    }

    if (!category) {
        return null;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <h3>Are you sure you want to delete {category.name}?</h3>
                    <Button onClick={handleDelete}>Delete</Button>

                </div>
            </div>
        </div>
    )
}

export default CategoryDelete;