import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { CategoryContext } from '../../providers/CategoryProvider';
import Category from './Category';
import { Button, ListGroup, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import "./Category.css"

const CategoryList = (props) => {
    const { categories, getAllCategories, getById, deleteCategory } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="container">
            <div className="justify-content-center">
                <Row>

                    <p><Link to={`/category/add`}>Add New Category</Link></p>

                </Row>
                <br></br>
                <Row>

                    {categories.map((category) => (
                        <>
                            <Category key={category.id} category={category} />

                        </>
                    ))}

                </Row>
            </div>
        </div>
    )
}

export default CategoryList;