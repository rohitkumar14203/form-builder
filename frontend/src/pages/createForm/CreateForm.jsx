import React, { useState } from "react";
import styles from "./CreateForm.module.css";
import { Trash2, Pencil } from "lucide-react";
import { createForm } from "../../services/formService";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [inputType, setInputType] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddInput = () => {
    if (inputs.length >= 20) return alert("Maximum 20 inputs allowed");
    if (!inputType || !inputLabel) return alert("Type and label required");

    const newInput = {
      type: inputType,
      label: inputLabel,
      placeholder: inputPlaceholder,
    };

    setInputs([...inputs, newInput]);
    clearFields();
  };

  const handleDeleteInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
    if (editIndex === index) {
      clearFields();
    }
  };

  const handleEditInput = (index) => {
    const selectedInput = inputs[index];
    setInputType(selectedInput.type);
    setInputLabel(selectedInput.label);
    setInputPlaceholder(selectedInput.placeholder);
    setEditIndex(index);
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
  };

  const clearFields = () => {
    setInputType("");
    setInputLabel("");
    setInputPlaceholder("");
    setEditIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || inputs.length === 0)
      return alert("Title and inputs required");

    const formData = { title, inputs };
    const res = await createForm(formData);

    if (res.success) {
      alert("Form created successfully");
      setTitle("");
      setInputs([]);
      clearFields();
    } else {
      alert(res.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.right}>
        <h2>Create Form</h2>

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
          Save Form
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
                className={styles.trashIcon}
                size={15}
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

export default CreateForm;
