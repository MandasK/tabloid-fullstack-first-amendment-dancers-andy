import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";

const EditTag = (props) => {
    
    const {
        tagToEdit,
    } = useContext(TagContext);
    
    const [editName] = useState(tagToEdit.name)

    return (
        <>        
            <div className="edit_Fields">
                <h5 className="tag_Spacer">Edit Tag '{editName}'</h5>
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
                    onClick={props.SaveTagChanges}
                >
                Save
                </Button>
              </div>
              <div className="tag_Delete_Button">
              
                <Button
                    size="sm"
                    color="danger"
                    className="tag_Action_Button"
                    onClick={() => props.RemoveTagConfirm(tagToEdit.id)}
                >
                Delete
                </Button>              
              </div>
            </div>
          </div>         
        </>
      )
    
}

export default EditTag
