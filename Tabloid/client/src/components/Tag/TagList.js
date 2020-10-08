import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";
import Tag from "./Tag";
import EditTagModal from "./EditTagModal";
import "./TagStyling.css";

const TagList = (props) => {
  const { tags, tagToEdit, GetAllTags, GetTagById } = useContext(TagContext);
  const [openModal, setOpenModal] = useState(false);

  const editTag = (id) => {
    GetTagById(id);
    setOpenModal(true);
  };

  useEffect(() => {
    GetAllTags();
  }, []);

  return (
    <>
      <div className="tag_Headline">
        <h2 className="tag_Spacer">Available tags</h2>
        <Button color="primary" className="new_Tag_Button">
          Add New
        </Button>
      </div>
      <h5 className="tag_Spacer">Click to edit</h5>
      <div className="tag_Container">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} editTag={editTag} />
        ))}
      </div>
      <EditTagModal openModal={openModal} tagToEdit={tagToEdit} />
    </>
  );
};

export default TagList;
