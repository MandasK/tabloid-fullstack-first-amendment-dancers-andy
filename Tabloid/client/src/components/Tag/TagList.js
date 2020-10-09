import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";
import Tag from "./Tag";
import "./TagStyling.css";

const TagList = (props) => {
  const {
    tags,
    tagToEdit,
    setTagToEdit,
    GetAllTags,
    GetTagById,
    UpdateTag,
    DeleteTag,
  } = useContext(TagContext);
  const [save, setSave] = useState(false);
  const [confirmView, setConfirmView] = useState(false);

  const editTag = (id) => {
    GetTagById(id);
  };

  useEffect(() => {
    GetAllTags();
  }, []);

  const handleFieldChange = (event) => {
    const stateToChange = { ...tagToEdit };
    stateToChange[event.target.id] = event.target.value;
    setTagToEdit(stateToChange);
    setSave(true);
  };

  const SaveTagChanges = () => {
    let updatedTag = {
      id: tagToEdit.id,
      name: tagToEdit.name,
    };
    UpdateTag(updatedTag);
    setTagToEdit(undefined);
    setSave(false);
    GetAllTags();
  };

  const DiscardTagChanges = () => {
    setSave(false);
    setTagToEdit(undefined);
  };
  const RemoveTagConfirm = () => {
    setConfirmView(true);
  };

  const CancelDelete = () => {
    setConfirmView(false);
  };
  const RemoveTag = (id) => {
    DeleteTag(id);
    setTagToEdit(undefined);
    setConfirmView(false);
    setSave(false);
    GetAllTags();
  };

  const editDeleteView = () => {

    if (tagToEdit !== undefined && !confirmView) {
      return (
        <>        
          <div className="edit_Fields">
            <h5 className="tag_Spacer">Edit tag '{tagToEdit.name}'</h5>
            <div className="edit_Row1">
              <Button className="tag_Button" color="primary">
                <fieldset>
                  <input
                    type="text"
                    size={tagToEdit.name.length}
                    required
                    onChange={(e) => handleFieldChange(e)}
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
                onClick={DiscardTagChanges}
              >
                Discard
              </Button>
  
              <Button
              size="sm"
                color="danger"
                className="tag_Action_Button"
                hidden={!save}
                onClick={SaveTagChanges}
              >
                Save
              </Button>
              </div>
              <div className="tag_Delete_Button">
              
                <Button
                size="sm"
                  color="danger"
                  className="tag_Action_Button"
                  onClick={() => RemoveTagConfirm(tagToEdit.id)}
                >
                  Delete
                </Button>              
              </div>
            </div>
          </div>         
        </>
      )
    }

    else if (tagToEdit !== undefined && confirmView) {
      return (
        
        <div className="delete_Box">
            <h5 className="delete_Tag_Headline">Are you sure you want to delete '{tagToEdit.name}'?</h5>
          <div className="edit_Row1">
            <Button
              size="sm"
              color="secondary"
              className="tag_Action_Button"
              onClick={CancelDelete}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              color="danger"
              className="tag_Action_Button"
              onClick={() => RemoveTag(tagToEdit.id)}
            >
              Delete
            </Button>
          </div>                  
        </div>
      )
    }
  }

  return (
    <>
      <div className="tag_Headline">
        <h2 className="tag_Spacer">Available tags</h2>
        <Button color="primary" className="new_Tag_Button">
          Add New
        </Button>
      </div>
      <h5 className="tag_Spacer">Click to edit</h5>
      <div className="tag_View_Container">
        <div>
          <div className="tag_Container">
            {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} editTag={editTag} />
          ))}
          </div>
        </div>
              
       
      {editDeleteView()} 
      
          </div>
        <div>
      </div>
    </>
  );
};

export default TagList;
