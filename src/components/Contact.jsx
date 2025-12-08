import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black mb-2">Contact Us</h1>
        <p className="text-gray-500">We'd love to hear from you. Get in touch with us today!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#007E6E]">Get in Touch</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-700">Address</p>
              <p className="text-gray-600">123 Fruit Street, Fresh City, FC 12345</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Phone</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Email</p>
              <p className="text-gray-600">info@fruitopia.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Hours</p>
              <p className="text-gray-600">Mon - Fri: 9AM - 6PM</p>
              <p className="text-gray-600">Sat - Sun: 10AM - 4PM</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#007E6E]"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#007E6E]"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#007E6E]"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#007E6E] text-white font-semibold py-2 rounded-md hover:bg-[#006456] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
