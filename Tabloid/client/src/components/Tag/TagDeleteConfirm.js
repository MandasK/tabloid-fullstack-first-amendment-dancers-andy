import React, { useContext } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";

const TagDeleteConfirm = (props) => {

    const {
        tagToEdit,
      } = useContext(TagContext);

    return (
        
        <div className="delete_Box">
            <h5 className="delete_Tag_Headline">Are you sure you want to delete '{tagToEdit.name}'?</h5>
          <div className="edit_Row1">
            <Button
              size="sm"
              color="secondary"
              className="tag_Action_Button"
              onClick={props.CancelDelete}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              color="danger"
              className="tag_Action_Button"
              onClick={() => props.RemoveTag(tagToEdit.id)}
            >
              Delete
            </Button>
          </div>                  
        </div>
      )
}

export default TagDeleteConfirm