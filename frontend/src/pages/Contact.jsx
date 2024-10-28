import React, { useState } from 'react';

const Contact = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
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
              placeHolder="Name"
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
              placeHolder="Email"
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
              placeHolder="Subject"
              required
              className="w-full p-2 border border-gray-300 rounded-none"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeHolder="Message..."
              required
              className="w-full p-2 border border-gray-300 rounded-none"
              rows="4"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
          Send Message
        </button>
      </form>
      </div>
  );
};

export default Contact;
