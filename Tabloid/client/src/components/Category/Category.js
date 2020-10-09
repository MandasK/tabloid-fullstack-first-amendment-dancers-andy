import React from 'react';
import { Card, CardTitle, CardBody, CardText, Button, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import "./Category.css"

const Category = ({ category }) => {
    return (
        <>

            <Card className="categoryCard">
                <div ClassName="row">
                    <CardBody className="text-center">
                        <CardText className="CardText">{category.name}</CardText>


                        <div></div>
                        <Link to={`/category/${category.id}/delete`}><Button className="deleteCategoryButton" color="danger">Delete</Button></Link>
                        <Link to={`/category/${category.id}/edit`}><Button className="editCategoryButton" color="primary">Edit</Button></Link>
                    </CardBody>
                </div>

            </Card>




        </>
    );
};

export default Category;