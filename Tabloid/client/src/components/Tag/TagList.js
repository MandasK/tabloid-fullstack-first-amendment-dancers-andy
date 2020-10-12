import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";
import Tag from "./Tag";
import AddTag from "./AddTag";
import EditTag from "./EditTag";
import TagDeleteConfirm from "./TagDeleteConfirm";
import "./TagStyling.css";

const TagList = () => {
  const {
    tags,
    tagToEdit,
    setTagToEdit,
    GetAllTags,
    GetTagById,
    UpdateTag,
    DeleteTag,
  } = useContext(TagContext);
  const [saveButton, setSaveButton] = useState(false);
  const [confirmView, setConfirmView] = useState(false);
  const [addTagWindow, setAddTagWindow] = useState(false);
  const [update, setUpdate] = useState(false)

  const editTag = (id) => {
    setAddTagWindow(false);
    GetTagById(id);
  };

  useEffect(() => {
    GetAllTags();
  }, [update]);
//Opens the Add New Tag Window
  const openNew = () => {
    setTagToEdit({name:""});
    setSaveButton(false);
    setConfirmView(false);
    setAddTagWindow(true)
}
//Handles all the fields in Edit and Add new
  const handleFieldChange = (event) => {
    const stateToChange = { ...tagToEdit };
    stateToChange[event.target.id] = event.target.value;
    setTagToEdit(stateToChange);
    setSaveButton(true);
  };

  const AddNewTag = () => {
    let tag = {
      name: tagToEdit.name
    };
    AddTag(tag)    
}

  const SaveTagChanges = () => {
    let updatedTag = {
      id: tagToEdit.id,
      name: tagToEdit.name,
    };
    UpdateTag(updatedTag);
    setUpdate(!update);
    setTagToEdit(undefined);
    setSaveButton(false);
  };

  const DiscardTagChanges = () => {
    setAddTagWindow(false);
    setSaveButton(false);
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
    setSaveButton(false);
    setUpdate(!update);
  };

//Resets the window after an 'Add Tag' action

  const CompleteAdd = () => {
    setAddTagWindow(false);
    setConfirmView(false);
    setSaveButton(false);
    setTagToEdit(undefined);
    setUpdate(!update);
  }


  return (
    <>
      <div className="tag_Headline">
        <h2 className="tag_Spacer">Available tags</h2>
        <Button color="primary" className="new_Tag_Button" onClick={(() => openNew())}>
          Add New
        </Button>
      </div>
      <h5 className="tag_Spacer">Click to edit</h5>
      <div className="tag_View_Container">
        <div className="tag_Container">
          <div className="tag_Sizer">
            {tags.map((tag) => (
              <Tag 
                  key={tag.id} 
                  tag={tag} 
                  editTag={editTag} 
              />
              ))}
          </div>
        </div>
        {/*These are the conditional components for the screen right (or top in mobile) section of Tag Management
        The Edit view contians the button to delete a tag */}
        <div className="right_Side">
          {(addTagWindow && !confirmView) && 
          <AddTag
                saveButton={saveButton}
                DiscardTagChanges={DiscardTagChanges}
                AddNewTag={AddNewTag}
                handleFieldChange={handleFieldChange}
                setSaveButton={setSaveButton}
                setAddTagWindow={setAddTagWindow}
                CompleteAdd={CompleteAdd} />
          }
          {(tagToEdit !== undefined && !confirmView && !addTagWindow) && 
          <EditTag
                saveButton={saveButton}
                DiscardTagChanges={DiscardTagChanges}
                SaveTagChanges={SaveTagChanges}
                handleFieldChange={handleFieldChange}
                RemoveTagConfirm={RemoveTagConfirm} />
          }
          {(tagToEdit !== undefined && confirmView && !addTagWindow) && 
          <TagDeleteConfirm
                CancelDelete={CancelDelete}
                RemoveTag={RemoveTag} />
          } 
        </div>    
      </div>
    </>
  );
};

export default TagList;
