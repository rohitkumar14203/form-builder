import React, { useEffect, useState } from "react";
import styles from "./ViewForm.module.css";
import { useParams } from "react-router-dom";
import { getFormById } from "../../services/formService";
import { useNavigate } from "react-router-dom";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      const { data, ok } = await getFormById(id);
      if (ok) {
        setForm(data);
      } else {
        console.error("Failed to fetch form");
      }
      setLoading(false);
    };
    fetchForm();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!form) return <div className={styles.error}>Form not found</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{form.title}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault;
          navigate("/");
        }}
        className={styles.form}
      >
        {form.inputs.map((input, index) => (
          <div key={index} className={styles.formGroup}>
            <label>{input.label}</label>
            <input type={input.type} placeholder={input.placeholder} />
          </div>
        ))}

        <div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewForm;
