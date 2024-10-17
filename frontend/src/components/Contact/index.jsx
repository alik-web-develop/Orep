import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import styles from './Contact.module.scss';
import { useTranslation } from "react-i18next"

function Contact() {

  const { t, i18n: { changeLanguage } } = useTranslation();
  const [open, setOpen] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_r9htwln', 'template_4srj7eq', form.current, 'aKImAJKARrOQD5GdS')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{t("contact.title")}</div>
        <div className={styles.desc}>{t("contact.description")}</div>
        <form ref={form} onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.contactTitle}>{t("contact.emailMe")}</div>
          <input className={styles.contactInput} placeholder={t("contact.email")} name="from_email" />
          <input className={styles.contactInput} placeholder={t("contact.name")} name="from_name" />
          <input className={styles.contactInput} placeholder={t("contact.subject")} name="subject" />
          <textarea className={styles.contactInputMessage} placeholder={t("contact.message")} rows="4" name="message" />
          <input type="submit" value={t("contact.send")} className={styles.contactButton} />
        </form>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
          message={t("contact.messageSent")}
          severity="success"
        />
      </div>
    </div>
  );
};

export default Contact;
