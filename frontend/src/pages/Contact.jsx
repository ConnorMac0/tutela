import React, { useState } from 'react';

const Contact = () => {
  const [result, setResult] = React.useState("");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_FORM_API_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Submitted Successfully");
      event.target.reset();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      console.log("Error", data);
      console.log(formAPIKey);
      
      setResult(data.message);
    }
  };

  return (

    <div className='flex w-full min-h-custom items-center'>
      <form onSubmit={handleSubmit} className="w-3/4 md:w-1/3 mx-auto p-[5%] md:p-[2%] bg-green shadow-md text-ivory">
      <h2 className="text-2xl font-bold mb-8 md:mb-0">Contact Us</h2>
      <p className='hidden md:flex mb-8'>Have any questions or suggestions? <br />Please reach out!</p>
      <div className='text-black'>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full p-2 border border-gray-300 rounded-none"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message..."
              required
              className="w-full p-2 border border-gray-300 rounded-none"
              rows="4"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
          Send Message
        </button>
        <span>{result}</span>
      </form>
      </div>
  );
};

export default Contact;
