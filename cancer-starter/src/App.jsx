import React from 'react'
import { Sidebar, Navbar } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";
const App = () => {
return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
         <Navbar /> 

        <Routes>
          <Route path="/" element={<div>suor </div>} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route
            path="/medical-records/:id"
            element={<SingleRecordDetails />}
          />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} /> */}
        </Routes>
      </div>
    </div>
  );
};


export default App
