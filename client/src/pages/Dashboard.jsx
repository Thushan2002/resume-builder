import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ResumeCard from "../components/cards/ResumeCard";
import CreateResumeModal from "../modals/CreateResumeModal";
import Spinner from "../components/Spinner";
import { FiFile, FiFilePlus, FiPlus } from "react-icons/fi";

const Dashboard = () => {
  const { axios, navigate } = useAppContext();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/resume/getResume");
      if (data.success) {
        setAllResumes(data.userResumes || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleResumeCreated = () => {
    setOpenCreateModal(false);
    fetchAllResumes();
  };

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <div className="min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">My Resumes</h1>
                <p className="text-gray-400 mt-2">
                  Create and manage your professional resumes
                </p>
              </div>
              <button
                onClick={() => setOpenCreateModal(true)}
                className="bg-gray-700 hover:scale-[.95] cursor-pointer text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200">
                <FiPlus />
                Create New Resume
              </button>
            </div>

            {/* Resumes Grid */}
            {loading ? (
              <Spinner size={"medium"} color={"white"} />
            ) : allResumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg flex flex-col justify-center items-center shadow-sm p-8 max-w-md mx-auto">
                  <FiFile className="text-6xl opacity-70" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No resumes yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first resume to get started
                  </p>
                  <button
                    onClick={() => setOpenCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                    Create Resume
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allResumes.map((resume) => (
                  <ResumeCard
                    key={resume._id}
                    resume={resume}
                    onEdit={() => navigate(`/resume/${resume._id}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Create Resume Modal */}
          <CreateResumeModal
            isOpen={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            onSuccess={handleResumeCreated}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
