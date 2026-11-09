import { useState } from "react";

const ContactUs = () => {
   const [name,setName] = useState("");
   const [email, setEmail] = useState("");
   const [subject, setSubject] = useState("");
   const [message, setMessage] = useState("");
   const [submitted, setSubmitted] = useState(false);

   const handleSubmit = (e) =>{
    e.preventDefault();

    setSubmitted(true);

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
   };


    return(
        <div className="contact-page">
            
            <div className="contact-heading">
                <h1>Contact Us</h1>
                <p>
         Have a question or suggestion? We'd love to hear from you.
         Send us a message using the form below.
          
                </p>

            </div>

            <div className="conatct-container">
               

                    <div className="contact-info-item">
                        <h3>Feedback</h3>
                        <p>Tell us about your experience with SpendWise!</p>

                    </div>
                

            </div>

            <div className="contact-form-container">
                <h3>Send us a message</h3>

                <form onSubmit={handleSubmit}>

                   <label>Your Name</label>
                   <input
                   type="text"
                   placeholder="Enter Your name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required
                   />
                   <label>Email Address</label>

                   <input
                   type="text"
                   placeholder="Enter your email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   />
                   
                   <label>Subject</label>
            <input
              type="text"
              placeholder="Enter the subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <label>Message</label>
            <textarea
              placeholder="Write your message here..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button type="submit">
              Send Message
            </button>



                </form>

                {submitted && (
                    <p className="contact-succes">
                        Your message has been submitted successfully!
                    </p>
                )}
            </div>
           
        </div>
    )
}

export default ContactUs;