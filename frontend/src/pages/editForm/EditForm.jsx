import React, { useEffect, useState } from "react";
import styles from "../createForm/CreateForm.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import { getFormById, updateForm } from "../../services/formService";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [inputType, setInputType] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const { data, ok } = await getFormById(id);
        if (ok) {
          setTitle(data.title);
          setInputs(data.inputs || []);
        } else {
          alert("Failed to fetch form");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching form");
      }
    };

    fetchForm();
  }, [id]);

  const handleAddInput = () => {
    if (inputs.length >= 20) return alert("Maximum 20 inputs allowed");
    if (!inputType || !inputLabel) return alert("Type and label required");

    const newInput = {
      type: inputType,
      label: inputLabel,
      placeholder: inputPlaceholder,
    };

    setInputs([...inputs, newInput]);
    setInputType("");
    setInputLabel("");
    setInputPlaceholder("");
  };

  const handleDeleteInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || inputs.length === 0)
      return alert("Title and inputs required");

    try {
      const { data, ok } = await updateForm(id, { title, inputs });
      if (ok) {
        alert("Form updated successfully");
        navigate("/");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating form");
    }
  };

  const handleEditInput = (index) => {
    const selectedInput = inputs[index];
    setInputType(selectedInput.type);
    setInputLabel(selectedInput.label);
    setInputPlaceholder(selectedInput.placeholder);
    setEditIndex(index);
  };
  const clearFields = () => {
    setInputType("");
    setInputLabel("");
    setInputPlaceholder("");
  };

  const handleUpdateInput = () => {
    if (editIndex === null) return;

    const updatedInputs = [...inputs];
    updatedInputs[editIndex] = {
      type: inputType,
      label: inputLabel,
      placeholder: inputPlaceholder,
    };

    setInputs(updatedInputs);
    clearFields();
    setEditIndex(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.right}>
        <h2>Edit Form</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Form Title"
          className={styles.titleInput}
        />

        <div className={styles.inputControls}>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="">Select Input Type</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>

          <input
            type="text"
            placeholder="Input Label"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
          />

          <input
            type="text"
            placeholder="Placeholder"
            value={inputPlaceholder}
            onChange={(e) => setInputPlaceholder(e.target.value)}
          />

          {editIndex === null ? (
            <button onClick={handleAddInput}>Add Input</button>
          ) : (
            <button onClick={handleUpdateInput}>Update Input</button>
          )}
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Save Changes
        </button>
      </div>

      <div className={styles.left}>
        <h3>Live Form Preview</h3>
        <div className={styles.previewForm}>
          <h4>{title || "Form Title"}</h4>
          {inputs.map((input, index) => (
            <div
              key={index}
              className={styles.previewInput}
              style={{ position: "relative" }}
            >
              <Pencil
                size={15}
                className={styles.pencilIcon}
                onClick={() => handleEditInput(index)}
              />
              <Trash2
                size={15}
                className={styles.trashIcon}
                onClick={() => handleDeleteInput(index)}
              />
              <label>{input.label}</label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                disabled
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
