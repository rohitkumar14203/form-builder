const BASE_URL =
  import.meta.env.API_BASE_URL ||
  "API_BASE_URL = https://form-builder-b6gl.onrender.com" ||
  "http://localhost:8000";

export const getAllForms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/form`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    return [];
  }
};

export const createForm = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/form/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    // console.log("Create Form Response:", data);
    return data;
  } catch (err) {
    console.error("Error creating form:", err);
    return { success: false, message: "Something went wrong" };
  }
};

export const deleteFormById = async (formId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/form/${formId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error deleting form:", err);
    return { error: "Delete request failed" };
  }
};

export const getFormById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/form/${id}`);
  const data = await res.json();
  return { data, ok: res.ok };
};

export const updateForm = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/api/form/${id}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return { data, ok: res.ok };
};
