import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Teacher from "./pages/teacher";
import Admin from "./pages/admin";
import Student from "./pages/student";
import Loader from "./pages/common/loader/loader";
import { ToastContainer, Flip } from "react-toastify";
import VerifyEmailConfirmation from "./pages/common/verifyEmailConfirmation";

import ProtectedRoute from "./utils/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import EmailVerified from "./pages/common/emailVerified";

const App = (props) => {
  useEffect(() => {
    document.getElementById("loader").style.display = "none";
  }, []);
  return (
    <>
      <Loader />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        transition={Flip}
      />
      <Switch>
        {/* Student  */}
        <Route path="/student/verifyEmail" exact component={VerifyEmailConfirmation} />

        <Route path="/emailVerified" emailVerified={true} exact component={EmailVerified}/>

        <ProtectedRoute path="/student" authRole={["Student"]}>
          <Student />
        </ProtectedRoute>

        {/* Teacher  */}
        <Route path="/teacher/verifyEmail" exact component={VerifyEmailConfirmation} />
        <ProtectedRoute path="/teacher" authRole={["Teacher"]}>
          <Teacher />
        </ProtectedRoute>

        {/* Admin */}
        <ProtectedRoute path="/admin" authRole={["Admin", "Tutor", "Payment"]}>
          <Admin />
        </ProtectedRoute>

        <Route path="/" component={Main} />
      </Switch>
    </>
  );
};

export default App;
