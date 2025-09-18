import React, { useState } from "react";
import hero_img from "../assets/images/hero.png";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Professional Templates",
      description:
        "Choose from dozens of ATS-friendly templates designed by experts",
    },
    {
      title: "Easy Customization",
      description: "Change colors, fonts, and layouts with just a few clicks",
    },
    {
      title: "Export Options",
      description:
        "Download your resume as PDF, Word, or share directly with employers",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      text: "This resume builder helped me land interviews at three FAANG companies!",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      text: "The templates are professional and the process is incredibly intuitive.",
    },
    {
      name: "Jessica Williams",
      role: "Product Manager",
      text: "I went from application to offer in just 2 weeks using a resume created here.",
    },
  ];

  return (
    <div className="w-full min-h-full text-white">
      <div className="mx-auto px-4 py-6">
        {/* header */}
        <Navbar />

        {/* Hero Section */}
        <div className="w-full min-h-screen flex flex-col sm:flex-row justify-between gap-5 items-center mb-8">
          <div className="min-h-screen flex flex-col items-start justify-center px-6 w-full sm:w-2/3">
            <p className="text-4xl sm:text-5xl font-bold text-white leading-snug">
              Create Your <br />
              <span
                className="bg-radial flex-1 text-5xl sm:text-7xl
                     from-purple-400 via-pink-500 to-yellow-500 
                     bg-[length:200%_200%] bg-clip-text text-transparent 
                     animate-text-shine">
                Resume Now
              </span>
            </p>

            <p className="mt-6 text-gray-400 max-w-xl text-lg">
              Build a professional resume in minutes — fast, easy, and designed
              to land your dream job.
            </p>

            <button className="mt-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
              Get Started For Free
            </button>

            <p className="mt-4 text-sm text-gray-500">
              No credit card required
            </p>
          </div>

          <div className="w-full sm:w-2/3 h-full relative group px-8 mt-10 sm:mt-0">
            <img
              src={hero_img}
              alt="Professional resume example"
              className="rounded-xl shadow-gray-700 transition duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl group-hover:blur-[1px]"
            />

            <p
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                text-xl sm:text-3xl text-white px-6 py-3 rounded-xl font-semibold 
                bg-gray/30 backdrop-blur-md shadow-lg 
                opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer hover:scale-105">
              Generate Now
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full py-16 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl my-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                10,000+
              </h3>
              <p className="text-gray-400 mt-2">Resumes Created</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                95%
              </h3>
              <p className="text-gray-400 mt-2">Satisfaction Rate</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                2,500+
              </h3>
              <p className="text-gray-400 mt-2">Jobs Landed</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full py-16 my-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Resume Builder
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border border-gray-700 transition-all duration-300 cursor-pointer hover:bg-gray-800 ${
                  activeFeature === index ? "bg-gray-800 border-purple-500" : ""
                }`}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}>
                <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mb-4">
                  <span className="text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Templates Preview */}
        <div className="w-full py-16 my-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Professional Templates
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Choose from our collection of professionally designed templates that
            pass ATS screening
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-800 rounded-xl p-4 transform transition duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-r from-purple-900 to-pink-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Template Preview {item}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Template {item}</h3>
                  <p className="text-gray-400 mt-2">
                    Modern and professional design
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-6 py-3 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-300">
              View All Templates
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="w-full py-16 my-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Success Stories
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Hear from people who landed their dream jobs using our resume
            builder
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mr-4">
                    <span className="text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-16 my-16 bg-gradient-to-br from-purple-900 to-gray-900 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Your Resume?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of job seekers who have landed their dream jobs with
            our resume builder
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
            Get Started Now
          </button>
          <p className="mt-4 text-gray-400 text-sm">
            It's free to start, no credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
