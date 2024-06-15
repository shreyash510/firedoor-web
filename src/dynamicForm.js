import React, { useState } from 'react';

const schema = [
  { label: "Name", type: "text", id: "name" },
  { label: "Email", type: "email", id: "email" },
  { label: "Age", type: "number", id: "age" },
  { label: "Gender", type: "select", id: "gender", options: ["Male", "Female", "Other"] }
];

const DynamicForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          {field.type === 'select' ? (
            <select id={field.id} onChange={handleChange}>
              <option value="">Select</option>
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.id}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
