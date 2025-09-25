import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/AppContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/inputs/TitleInput";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaDownload,
  FaTrash,
  FaPalette,
  FaCheck,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaProjectDiagram,
  FaCertificate,
} from "react-icons/fa";
import {
  MdWork,
  MdSchool,
  MdBuild,
  MdInterests,
  MdTranslate,
} from "react-icons/md";
import ProfileForm from "./forms/ProfileForm";
import ContactForm from "./forms/ContactForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import LanguagesForm from "./forms/LanguagesForm";
import InterestsForm from "./forms/InterestsForm";

const EditResume = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const { resumeId } = useParams();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      gitHub: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        gitHub: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });

  const pages = [
    { id: "profile-info", label: "Profile", progress: 12, icon: FaUser },
    { id: "contact-info", label: "Contact", progress: 25, icon: FaEnvelope },
    { id: "experience", label: "Experience", progress: 37, icon: MdWork },
    { id: "education", label: "Education", progress: 50, icon: MdSchool },
    { id: "skills", label: "Skills", progress: 62, icon: MdBuild },
    { id: "projects", label: "Projects", progress: 75, icon: FaProjectDiagram },
    {
      id: "certifications",
      label: "Certifications",
      progress: 87,
      icon: FaCertificate,
    },
    { id: "languages", label: "Languages", progress: 100, icon: MdTranslate },
    { id: "interests", label: "Interests", progress: 100, icon: MdInterests },
  ];

  // validate Inputs
  const validateNext = () => {
    // Add validation logic if needed
    return true;
  };

  // navigate to next page
  const navigateNextPage = () => {
    if (!validateNext()) return;
    const currentIndex = pages.findIndex((page) => page.id === currentPage);
    if (currentIndex < pages.length - 1) {
      setCurrentPage(pages[currentIndex + 1].id);
      setProgress(pages[currentIndex + 1].progress);
    }
  };

  // navigate to previous page
  const navigatePrevPage = () => {
    const currentIndex = pages.findIndex((page) => page.id === currentPage);
    if (currentIndex > 0) {
      setCurrentPage(pages[currentIndex - 1].id);
      setProgress(pages[currentIndex - 1].progress);
    }
  };

  // update nested objects
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // update array item
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const newArray = [...prev[section]];
      if (key) {
        newArray[index] = { ...newArray[index], [key]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [section]: newArray };
    });
  };

  // add array item
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // remove array item
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  // fetch resume info by id
  const fetchResumeData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/resume/getResume/${resumeId}`);
      if (data.success) {
        setResumeData(data.resume);
        setProgress(12);
      }
    } catch (error) {
      console.log("error in fetching resume by id:", error.message);
      setErrorMsg("Failed to load resume data");
    } finally {
      setLoading(false);
    }
  };

  // upload resume images
  const uploadResumeImages = async () => {
    try {
      let profileUrl = resumeData.profileInfo.profilePreviewUrl;
      if (resumeData.profileInfo.profileImg) {
        const formData = new FormData();
        formData.append("image", resumeData.profileInfo.profileImg);
        const { data } = await axios.post(
          "/api/resume/upload-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        profileUrl = data.imageUrl;
      }
      return { thumbnailLink: resumeData.thumbnailLink, profileUrl };
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to upload images");
      return { thumbnailLink: "", profileUrl: "" };
    }
  };

  // update resume details
  const updateResumeDetails = async (thumbnailLink, profileUrl) => {
    try {
      const updatedData = {
        ...resumeData,
        thumbnailLink,
        profileInfo: {
          ...resumeData.profileInfo,
          profilePreviewUrl: profileUrl,
          profileImg: null,
        },
      };
      const { data } = await axios.put(
        `/api/resume/updateResume/${resumeId}`,
        updatedData
      );
      if (data.success) {
        setResumeData(updatedData);
        setErrorMsg("");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update resume");
    }
  };

  // handle save
  const handleSave = async () => {
    setLoading(true);
    const { thumbnailLink, profileUrl } = await uploadResumeImages();
    await updateResumeDetails(thumbnailLink, profileUrl);
    setLoading(false);
  };

  // delete resume
  const deleteResume = async () => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        const { data } = await axios.delete(
          `/api/resume/deleteResume/${resumeId}`
        );
        if (data.success) {
          navigate("/resumes");
        }
      } catch (err) {
        console.log("error in deleting resume:", err.message);
        setErrorMsg("Failed to delete resume");
      }
    }
  };

  // react to print
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: resumeData.title || "Resume",
  });

  // update baseWidth
  const updateBaseWidth = () => {
    setBaseWidth(window.innerWidth > 1200 ? 800 : window.innerWidth - 400);
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    if (resumeId) {
      fetchResumeData();
    }
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, [resumeId]);

  const CurrentPageIcon =
    pages.find((page) => page.id === currentPage)?.icon || FaUser;

  // render form based on current page
  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileForm
            profileInfo={resumeData.profileInfo}
            updateSection={updateSection}
          />
        );
      case "contact-info":
        return (
          <ContactForm
            contactInfo={resumeData.contactInfo}
            updateSection={updateSection}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            workExperience={resumeData.workExperience}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "education":
        return (
          <EducationForm
            education={resumeData.education}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "skills":
        return (
          <SkillsForm
            skills={resumeData.skills}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            projects={resumeData.projects}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            certifications={resumeData.certifications}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "languages":
        return (
          <LanguagesForm
            languages={resumeData.languages}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "interests":
        return (
          <InterestsForm
            interests={resumeData.interests}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <DashboardLayout>
        <div className="mx-auto py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="flex-1">
              <TitleInput
                value={resumeData.title}
                onChange={(value) =>
                  setResumeData((prev) => ({ ...prev, title: value }))
                }
                className="text-2xl font-bold text-white bg-gray-800 border-gray-700"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50">
                <FaCheck className="text-lg" />
                Save
              </button>
              <button
                onClick={() => setOpenThemeSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                <FaPalette className="text-lg" />
                Theme
              </button>
              <button
                onClick={() => setOpenPreviewModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaEye className="text-lg" />
                Preview
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <FaDownload className="text-lg" />
                Download
              </button>
              <button
                onClick={deleteResume}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <FaTrash className="text-lg" />
                Delete
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-white">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {pages.map((page) => {
              const IconComponent = page.icon;
              return (
                <button
                  key={page.id}
                  onClick={() => {
                    setCurrentPage(page.id);
                    setProgress(page.progress);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    currentPage === page.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}>
                  <IconComponent
                    className={`text-lg ${
                      currentPage === page.id ? "text-white" : "text-gray-400"
                    }`}
                  />
                  {page.label}
                  {currentPage === page.id && (
                    <FaCheck className="text-sm ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-7 gap-8">
            {/* Form Section */}
            <div className="xl:col-span-3">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-400">Loading your resume...</p>
                  </div>
                ) : errorMsg ? (
                  <div className="text-center py-12">
                    <FaTimes className="text-4xl text-red-400 mx-auto mb-4" />
                    <p className="text-red-400">{errorMsg}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Current Section Header */}
                    <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <CurrentPageIcon className="text-white text-lg" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {pages.find((page) => page.id === currentPage)?.label}{" "}
                          Section
                        </h2>
                        <p className="text-gray-400 text-sm">
                          Complete this section to move forward
                        </p>
                      </div>
                    </div>

                    {renderForm()}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                      <button
                        onClick={navigatePrevPage}
                        disabled={currentPage === pages[0].id}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <FaChevronLeft className="text-sm" />
                        Previous
                      </button>
                      <button
                        onClick={navigateNextPage}
                        disabled={currentPage === pages[pages.length - 1].id}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                        <FaChevronRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Sidebar */}
            <div className="xl:col-span-4">
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg sticky top-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaEye className="text-blue-400" />
                  Live Preview
                </h3>
                <div className="aspect-[1/1.414] bg-white rounded-lg shadow-2xl transform  origin-top mx-auto overflow-hidden">
                  <div
                    ref={resumeRef}
                    className="p-6 h-full overflow-y-auto text-black">
                    <div className="text-center mb-6">
                      {resumeData.profileInfo.profilePreviewUrl && (
                        <img
                          src={resumeData.profileInfo.profilePreviewUrl}
                          alt="Profile"
                          className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                      )}
                      <h1 className="text-2xl font-bold text-gray-900">
                        {resumeData.profileInfo.fullName || "Your Name"}
                      </h1>
                      <p className="text-gray-600 text-lg">
                        {resumeData.profileInfo.designation ||
                          "Your Designation"}
                      </p>
                    </div>

                    {resumeData.profileInfo.summary && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold border-b mb-2">
                          Summary
                        </h2>
                        <p className="text-gray-700 text-sm">
                          {resumeData.profileInfo.summary}
                        </p>
                      </div>
                    )}

                    <div className="mb-6">
                      <h2 className="text-xl font-semibold border-b mb-2">
                        Contact
                      </h2>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {resumeData.contactInfo.email && (
                          <div className="flex items-center gap-1">
                            <FaEnvelope className="text-gray-500" />
                            <span className="text-gray-700">
                              {resumeData.contactInfo.email}
                            </span>
                          </div>
                        )}
                        {resumeData.contactInfo.phone && (
                          <div className="flex items-center gap-1">
                            <FaPhone className="text-gray-500" />
                            <span className="text-gray-700">
                              {resumeData.contactInfo.phone}
                            </span>
                          </div>
                        )}
                        {resumeData.contactInfo.location && (
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span className="text-gray-700">
                              {resumeData.contactInfo.location}
                            </span>
                          </div>
                        )}
                        {resumeData.contactInfo.linkedIn && (
                          <div className="flex items-center gap-1">
                            <FaLinkedin className="text-gray-500" />
                            <span className="text-gray-700">
                              {resumeData.contactInfo.linkedIn}
                            </span>
                          </div>
                        )}
                        {resumeData.contactInfo.gitHub && (
                          <div className="flex items-center gap-1">
                            <FaGithub className="text-gray-500" />
                            <span className="text-gray-700">
                              {resumeData.contactInfo.gitHub}
                            </span>
                          </div>
                        )}
                        {resumeData.contactInfo.website && (
                          <div className="flex items-center gap-1">
                            <FaGlobe className="text-gray-500" />
                            <span className="text-gray-700">
                              {resumeData.contactInfo.website}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {resumeData.workExperience.length > 0 &&
                      resumeData.workExperience[0].company && (
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b mb-2">
                            Work Experience
                          </h2>
                          {resumeData.workExperience.map((exp, idx) => (
                            <div key={idx} className="mb-4 text-sm">
                              <h3 className="font-semibold text-gray-800">
                                {exp.role} at {exp.company}
                              </h3>
                              <p className="text-gray-600">
                                {exp.startDate} - {exp.endDate}
                              </p>
                              <p className="text-gray-700">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                    {resumeData.education.length > 0 &&
                      resumeData.education[0].degree && (
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b mb-2">
                            Education
                          </h2>
                          {resumeData.education.map((edu, idx) => (
                            <div key={idx} className="mb-4 text-sm">
                              <h3 className="font-semibold text-gray-800">
                                {edu.degree}
                              </h3>
                              <p className="text-gray-600">{edu.institution}</p>
                              <p className="text-gray-600">
                                {edu.startDate} - {edu.endDate}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                    {resumeData.skills.length > 0 &&
                      resumeData.skills[0].name && (
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b mb-2">
                            Skills
                          </h2>
                          {resumeData.skills.map((skill, idx) => (
                            <div key={idx} className="mb-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-800">
                                  {skill.name}
                                </span>
                                <span className="text-gray-600">
                                  {skill.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${skill.progress}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    {resumeData.projects.length > 0 &&
                      resumeData.projects[0].title && (
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b mb-2">
                            Projects
                          </h2>
                          {resumeData.projects.map((proj, idx) => (
                            <div key={idx} className="mb-4 text-sm">
                              <h3 className="font-semibold text-gray-800">
                                {proj.title}
                              </h3>
                              <p className="text-gray-700">
                                {proj.description}
                              </p>
                              {proj.gitHub && (
                                <p className="text-gray-600">
                                  GitHub: {proj.gitHub}
                                </p>
                              )}
                              {proj.liveDemo && (
                                <p className="text-gray-600">
                                  Live Demo: {proj.liveDemo}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                    {resumeData.certifications.length > 0 &&
                      resumeData.certifications[0].title && (
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b mb-2">
                            Certifications
                          </h2>
                          {resumeData.certifications.map((cert, idx) => (
                            <div key={idx} className="mb-2 text-sm">
                              <h3 className="font-semibold text-gray-800">
                                {cert.title}
                              </h3>
                              <p className="text-gray-600">
                                Issuer: {cert.issuer}
                              </p>
                              <p className="text-gray-600">Year: {cert.year}</p>
                            </div>
                          ))}
                        </div>
                      )}

                    {resumeData.languages.length > 0 &&
                      resumeData.languages[0].name && (
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b mb-2">
                            Languages
                          </h2>
                          {resumeData.languages.map((lang, idx) => (
                            <div key={idx} className="mb-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-800">
                                  {lang.name}
                                </span>
                                <span className="text-gray-600">
                                  {lang.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-green-600 h-1.5 rounded-full"
                                  style={{ width: `${lang.progress}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    {resumeData.interests.length > 0 &&
                      resumeData.interests[0] && (
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b mb-2">
                            Interests
                          </h2>
                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {resumeData.interests.map((interest, idx) => (
                              <li key={idx}>{interest}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
                <p className="text-center text-gray-400 text-sm mt-4">
                  Real-time preview updates as you type
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Preview Modal */}
      {openPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaEye className="text-blue-400" />
                Resume Preview
              </h3>
              <button
                onClick={() => setOpenPreviewModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-8 flex justify-center bg-gray-900 overflow-y-auto">
              <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full">
                <div ref={resumeDownloadRef}>
                  <div className="text-center mb-6">
                    {resumeData.profileInfo.profilePreviewUrl && (
                      <img
                        src={resumeData.profileInfo.profilePreviewUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                      />
                    )}
                    <h1 className="text-3xl font-bold text-gray-900">
                      {resumeData.profileInfo.fullName || "Your Name"}
                    </h1>
                    <p className="text-xl text-gray-600">
                      {resumeData.profileInfo.designation || "Your Designation"}
                    </p>
                  </div>

                  {resumeData.profileInfo.summary && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold border-b mb-2">
                        Summary
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {resumeData.profileInfo.summary}
                      </p>
                    </div>
                  )}

                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold border-b mb-2">
                      Contact
                    </h2>
                    <ul className="space-y-1 text-gray-700">
                      {resumeData.contactInfo.email && (
                        <li>
                          <FaEnvelope className="inline mr-2" />{" "}
                          {resumeData.contactInfo.email}
                        </li>
                      )}
                      {resumeData.contactInfo.phone && (
                        <li>
                          <FaPhone className="inline mr-2" />{" "}
                          {resumeData.contactInfo.phone}
                        </li>
                      )}
                      {resumeData.contactInfo.location && (
                        <li>
                          <FaMapMarkerAlt className="inline mr-2" />{" "}
                          {resumeData.contactInfo.location}
                        </li>
                      )}
                      {resumeData.contactInfo.linkedIn && (
                        <li>
                          <FaLinkedin className="inline mr-2" />{" "}
                          {resumeData.contactInfo.linkedIn}
                        </li>
                      )}
                      {resumeData.contactInfo.gitHub && (
                        <li>
                          <FaGithub className="inline mr-2" />{" "}
                          {resumeData.contactInfo.gitHub}
                        </li>
                      )}
                      {resumeData.contactInfo.website && (
                        <li>
                          <FaGlobe className="inline mr-2" />{" "}
                          {resumeData.contactInfo.website}
                        </li>
                      )}
                    </ul>
                  </div>

                  {resumeData.workExperience.length > 0 &&
                    resumeData.workExperience[0].company && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-semibold border-b mb-2">
                          Work Experience
                        </h2>
                        {resumeData.workExperience.map((exp, idx) => (
                          <div key={idx} className="mb-4">
                            <h3 className="font-semibold text-gray-800">
                              {exp.role} at {exp.company}
                            </h3>
                            <p className="text-gray-600">
                              {exp.startDate} - {exp.endDate}
                            </p>
                            <p className="text-gray-700">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                  {resumeData.education.length > 0 &&
                    resumeData.education[0].degree && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-semibold border-b mb-2">
                          Education
                        </h2>
                        {resumeData.education.map((edu, idx) => (
                          <div key={idx} className="mb-4">
                            <h3 className="font-semibold text-gray-800">
                              {edu.degree}
                            </h3>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-gray-600">
                              {edu.startDate} - {edu.endDate}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                  {resumeData.skills.length > 0 &&
                    resumeData.skills[0].name && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-semibold border-b mb-2">
                          Skills
                        </h2>
                        {resumeData.skills.map((skill, idx) => (
                          <div key={idx} className="mb-2">
                            <div className="flex justify-between">
                              <span className="text-gray-800">
                                {skill.name}
                              </span>
                              <span className="text-gray-600">
                                {skill.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${skill.progress}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  {resumeData.projects.length > 0 &&
                    resumeData.projects[0].title && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-semibold border-b mb-2">
                          Projects
                        </h2>
                        {resumeData.projects.map((proj, idx) => (
                          <div key={idx} className="mb-4">
                            <h3 className="font-semibold text-gray-800">
                              {proj.title}
                            </h3>
                            <p className="text-gray-700">{proj.description}</p>
                            {proj.gitHub && (
                              <p className="text-gray-600">
                                GitHub: {proj.gitHub}
                              </p>
                            )}
                            {proj.liveDemo && (
                              <p className="text-gray-600">
                                Live Demo: {proj.liveDemo}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                  {resumeData.certifications.length > 0 &&
                    resumeData.certifications[0].title && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-semibold border-b mb-2">
                          Certifications
                        </h2>
                        {resumeData.certifications.map((cert, idx) => (
                          <div key={idx} className="mb-2">
                            <h3 className="font-semibold text-gray-800">
                              {cert.title}
                            </h3>
                            <p className="text-gray-600">
                              Issuer: {cert.issuer}, Year: {cert.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                  {resumeData.languages.length > 0 &&
                    resumeData.languages[0].name && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-semibold border-b mb-2">
                          Languages
                        </h2>
                        {resumeData.languages.map((lang, idx) => (
                          <div key={idx} className="mb-2">
                            <div className="flex justify-between">
                              <span className="text-gray-800">{lang.name}</span>
                              <span className="text-gray-600">
                                {lang.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${lang.progress}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  {resumeData.interests.length > 0 &&
                    resumeData.interests[0] && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-semibold border-b mb-2">
                          Interests
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700">
                          {resumeData.interests.map((interest, idx) => (
                            <li key={idx}>{interest}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme Selector Modal */}
      {openThemeSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaPalette className="text-purple-400" />
                Select Theme
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center text-gray-400">
                  Theme options coming soon...
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => setOpenThemeSelector(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                Cancel
              </button>
              <button
                onClick={() => setOpenThemeSelector(false)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                Apply Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditResume;
