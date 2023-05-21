import React, { useState } from "react";
import "./style.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic for form submission
    // You can send the form data to your backend or perform any other actions
    // After the form is submitted successfully, you can set setIsSubmitted to true
  };


  return (
    <div className="wrapper centered">
      <article className="letter">
        <div className="side">
          <form className="form" onSubmit={handleSubmit}>
              <h1>Get In Touch! </h1>
            <div className="flex">
              <label>
                <input
                  required
                  placeholder=""
                  type="text"
                  className="input"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <span>first name</span>
              </label>

              <label>
                <input
                  required
                  placeholder=""
                  type="text"
                  className="input"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <span>last name</span>
              </label>
            </div>

            <label>
              <input
                required
                placeholder=""
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span>email</span>
            </label>

            <label>
              <input
                required
                type="tel"
                placeholder=""
                className="input"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <span>contact number</span>
            </label>

            <label>
              <textarea
                required
                rows="3"
                placeholder=""
                className="input01"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <span>message</span>
            </label>
            <button className="button__contact" type="submit">Contact us</button>

          </form>
        </div>
      </article>
      {/* <div className="envelope front"></div>
      <div className="envelope back"></div>
      {isSubmitted && (
        <p className="result-message centered">Thank you for your message</p>
      )} */}
    </div>
  );
};

export default ContactForm;
