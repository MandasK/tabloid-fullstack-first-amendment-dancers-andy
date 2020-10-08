import React, { useState, useContext, useEffect } from 'react';
import { CategoryContext } from "../../providers/CategoryProvider";
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup } from 'reactstrap';

const CategoryEdit = () => {
    const [category, setCategory] = useState();
    const [updatedCategory, setUpdatedCategory] = useState();
    const { getById, updateCategory } = useContext(CategoryContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getById(id).then(setCategory);
    }, []);

    const handleEdit = (evt) => {
        const stateToChange = { ...updatedCategory }
        stateToChange[evt.target.name] = evt.target.value;
        setUpdatedCategory(stateToChange);
    }

    const editCategory = () => {
        if (updatedCategory.id !== 0) {
            updateCategory({
                id: parseInt(category.id),
                name: updatedCategory.name
            })
                .then(() => history.push("/category"))
                .catch((err) => alert(`An error ocurred: ${err.message}`));
        }
    }

    if (!category) {
        return null;
    }

    return (
        <>
            <Form>
                <FormGroup>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        name="name"
                        required
                        className="form-control"
                        defaultValue={category.name}
                        onChange={handleEdit} />
                </FormGroup>
                <FormGroup>
                    <Button type="button"
                        onClick={e => {
                            e.preventDefault()
                            editCategory()
                        }}>Save Changes</Button>
                </FormGroup>
            </Form>
        </>
    )
}

export default CategoryEdit;