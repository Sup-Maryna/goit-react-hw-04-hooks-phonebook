import React, { useState } from "react";
import PropTypes from "prop-types";
import css from "./ContactForm.module.css";
import FormButton from "../FormButton/FormButton";
import { v1 as uuid } from "uuid";

export default function ContactForm(props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;
    if (inputName === "name") {
      setName(value);
    }
    if (inputName === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contacts = {
      id: uuid(),
      name,
      number,
    };
    props.onSubmit(contacts);
    console.log(contacts);
    reset();
  };
  const reset = () => {
    setName("");
    setNumber("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.formItem}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="The name can only consist of letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
            required
          />
        </label>
        <label className={css.formItem}>
          Number
          <input
            className={css.formInput}
            name="number"
            type="tel"
            value={number}
            onChange={handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="The phone number must be numbers and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <FormButton type="submit" className={css.formBtn} label="Add contact" />
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
