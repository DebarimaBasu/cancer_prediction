import React from 'react'
import { Sidebar, Navbar } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useStateContext } from "./context";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Home, Onboarding,Profile } from "./pages";
import { Buffer } from "buffer";
const App = () => {
  const {  currentUser,fetchUserByEmail  } = useStateContext();
  const { isSignedIn, user,isLoaded, } = useUser();
  const { redirectToSignIn } = useClerk();
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.Buffer) {
      window.Buffer = Buffer;
    }
  }, []);
  
  useEffect(() => {
   if (!isLoaded) return; 

    if (!isSignedIn) {
      redirectToSignIn(); // Redirect only if user is NOT signed in
    } else if (user) {
      fetchUserByEmail(user.primaryEmailAddress); // Fetch user details
    }
  }, [isSignedIn, user, fetchUserByEmail, redirectToSignIn, isLoaded]);

  useEffect(() => {
    if (user && currentUser === null) {
      console.log("Redirecting to onboarding");
      navigate("/onboarding"); // Redirect ONLY if the user is signed in but not in the database
    }
  }, [user, currentUser, navigate]);
return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
         <Navbar /> 

        <Routes>
          <Route path="/" element={<Home/>} />
           <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} /> 
         
          {/* <Route path="/medical-records" element={<MedicalRecords />} />
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
