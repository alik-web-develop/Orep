import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import styles from './Contact.module.scss';

const Contact = () => {
  const [open, setOpen] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_tox7kqs', 'template_nv7k7mj', form.current, 'SybVGsYS52j2TfLbi')
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
        <div className={styles.title}>Contact</div>
        <div className={styles.desc}>Feel free to reach out to me for any questions or opportunities!</div>
        <form ref={form} onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.contactTitle}>Email Me 🚀</div>
          <input className={styles.contactInput} placeholder="Your Email" name="from_email" />
          <input className={styles.contactInput} placeholder="Your Name" name="from_name" />
          <input className={styles.contactInput} placeholder="Subject" name="subject" />
          <textarea className={styles.contactInputMessage} placeholder="Message" rows="4" name="message" />
          <input type="submit" value="Send" className={styles.contactButton} />
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </div>
    </div>
  );
};

export default Contact;
