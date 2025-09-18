import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-gray-800 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
        <div>
          <h3 className="text-xl font-bold mb-4">ResumeBuilder</h3>
          <p className="text-gray-400">
            Creating professional resumes that help you land your dream job.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                Templates
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                Resume Tips
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
