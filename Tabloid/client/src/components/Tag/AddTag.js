import React, { useContext } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";

const AddTag = (props) => {
    const {
        tagToEdit,
        AddTag,
      } = useContext(TagContext);

      //Adds the new tag to database
      const AddNewTag = (e) => {
            let tag = {
                name: tagToEdit.name
            }
            AddTag(tag);
            //Closes the 'Add' window, clears tagToEdit state, and gets a fresh tag list
            props.CompleteAdd()            
      }


    return (
        <>
            <div className="edit_Fields">
                <h5 className="tag_Spacer">Create New Tag</h5>
                <div className="edit_Row1">
                <Button className="tag_Button" color="primary">
                    <fieldset>
                    <input
                        type="text"
                        size={tagToEdit.name.length}
                        required
                        onChange={(e) => props.handleFieldChange(e)}
                        id="name"
                        value={tagToEdit.name}
                        placeholder={tagToEdit.name}
                        className="edit_Tag_Input_Field"
                    />
                    </fieldset>
                </Button>
                
            </div>
                <div className="edit_Row2">
                    <div className="left_side_buttons">
                        <Button
                            size="sm"
                            color="secondary"
                            className="tag_Action_Button"
                            onClick={props.DiscardTagChanges}
                        >
                        Discard
                        </Button>       
                        <Button
                            size="sm"
                                color="danger"
                                className="tag_Action_Button"
                                hidden={!props.saveButton}
                                onClick={AddNewTag}
                            >
                        Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
      )
}

export default AddTag