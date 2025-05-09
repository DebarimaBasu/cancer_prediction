import React, { useState, useEffect } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";
import { useStateContext } from "../../context/index.jsx";
import CreateRecordModal from "./components/create-record-modal"; // Adjust the import path
import RecordCard from "./components/record-card"; // Adjust the import path

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    records,
    fetchUserRecords,
    createRecord,
    fetchUserByEmail,
    currentUser,
  } = useStateContext();
  const [userRecords, setUserRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (email ) {
      // prevEmailRef.current = email;
      fetchUserByEmail(email);
      fetchUserRecords(email);
    }
  }, [user, fetchUserByEmail, fetchUserRecords]);
  

  useEffect(() => {
    setUserRecords(records);
    localStorage.setItem("userRecords", JSON.stringify(records));
  }, [records]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createFolder = async (foldername) => {
    try {
      if (currentUser) {
        const newRecord = await createRecord({
          userId: currentUser.id,
          recordName: foldername,
          analysisResult: "",
          kanbanRecords: "",
          createdBy: user.primaryEmailAddress.emailAddress,
          // createdBy: user.email.address,
        });

        if (newRecord) {
          fetchUserRecords(user.email.address);
          handleCloseModal();
        }
      }
    } catch (e) {
      console.log(e);
      handleCloseModal();
    }
  };

  // const handleNavigate = (name) => {
  //   const filteredRecords = userRecords.filter(
  //     (record) => record.recordName === name,
  //   );
  //   navigate(`/medical-records/${name}`, {
  //     state: filteredRecords[0],
  //   });
  // };
  const handleNavigate = (name) => {
    const matchedRecord = userRecords.find(
      (record) => record.recordName === name
    );
  
    if (!matchedRecord) {
      console.warn(`No record found with name: ${name}`);
      return;
    }
  
    navigate(`/medical-records/${name}`, {
      state: matchedRecord,
    });
  };
  

  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border bg-[#17171e] border-green-400 bg-[] px-4 py-2 text-sm font-medium text-gray-200 shadow-sm hover:bg-green-900 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a]  dark:text-white dark:hover:bg-neutral-800"
        onClick={handleOpenModal}
      >
        <IconCirclePlus />
        Create Record
      </button>

      <CreateRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={createFolder}
      />

<div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
  {userRecords?.map((record) => (
    <RecordCard
      key={record._id} // Ensure this is a unique identifier
      record={record}
      onNavigate={handleNavigate}
    />
  ))}
</div>

    </div>
  );
};

export default Index;