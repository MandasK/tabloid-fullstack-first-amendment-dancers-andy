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

  return (
    <>
      <div className="tag_Headline">
        <h2 className="tag_Spacer">Available tags</h2>
        <Button color="primary" className="new_Tag_Button">
          Add New
        </Button>
      </div>
      {tagToEdit !== undefined ? (
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
            {!confirmView ? (
              <Button
                color="danger"
                className="tag_Button"
                onClick={() => RemoveTagConfirm(tagToEdit.id)}
              >
                Delete
              </Button>
            ) : (
              <div className="deleteConfirm">
                <div className="edit_Row1">
                  <h5>Are you sure you want to delete '{tagToEdit.name}'?</h5>
                  <Button
                    color="secondary"
                    className="tag_Button"
                    onClick={CancelDelete}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    className="tag_Button"
                    onClick={() => RemoveTag(tagToEdit.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="edit_Row2">
            <Button
              color="secondary"
              className="tag_Button"
              onClick={DiscardTagChanges}
            >
              Discard Changes
            </Button>

            <Button
              color="danger"
              className="tag_Button"
              hidden={!save}
              onClick={SaveTagChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <h5 className="tag_Spacer">Click to edit</h5>
      )}
      <div className="tag_Container">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} editTag={editTag} />
        ))}
      </div>
    </>
  );
};

export default TagList;
