import React, { useContext, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const CategoryForm = () => {

    const { addCategory } = useContext(CategoryContext);
    const history = useHistory();
    const [nameText, setNameText] = useState();



    const ConstructCategory = evt => {
        evt.PreventDefault();
        addCategory({ name: nameText })
            .then(() => history.push("/category"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <>

            <div className="row justify-content-center">
                <h3>Add a Category</h3>
                <Form onSubmit={ConstructCategory}>
                    <FormGroup>
                        <Label for="nameText">Name</Label>
                        <Input id="nameText" type="text" placeholder="Enter Category Name" onChange={e => setNameText(e.target.Value)} />
                    </FormGroup>
                    <Button>Add Category</Button>
                </Form>
            </div>

        </>
    )
};

export default CategoryForm;