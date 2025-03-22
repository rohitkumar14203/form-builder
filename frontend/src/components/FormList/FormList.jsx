import React, { useEffect, useState } from "react";
import { getAllForms, deleteFormById } from "../../services/formService";
import styles from "./FormList.module.css";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      const data = await getAllForms();
      setForms(data);
    };
    fetchForms();
  }, []);

  const handleDelete = async (formId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this form?"
    );
    if (!confirm) return;

    const res = await deleteFormById(formId);
    if (res.success) {
      alert("Form Deleted Successfully");
      setForms(forms.filter((f) => f._id !== formId));
    } else {
      alert("Failed to delete Form");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>All Forms</h2>
        <button
          className={styles.createBtn}
          onClick={() => navigate("/create-form")}
        >
          Create Form
        </button>
      </div>

      {forms.length === 0 ? (
        <p>No forms available.</p>
      ) : (
        <div className={styles.formGrid}>
          {forms.map((form) => (
            <div key={form._id} className={styles.formCard}>
              <h4>{form.title}</h4>
              <div className={styles.cardActions}>
                <Eye
                  size={20}
                  className={styles.icon}
                  onClick={() => navigate(`/form/${form._id}`)}
                />
                <Pencil
                  size={20}
                  className={styles.icon}
                  onClick={() => navigate(`/form/${form._id}/edit`)}
                />
                <Trash2
                  size={20}
                  className={styles.icon}
                  onClick={() => {
                    return handleDelete(form._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormList;
