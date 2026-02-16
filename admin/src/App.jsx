import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

import AddBook from "./components/AddBook";
import ListBook from "./components/ListBook";
import Orders from "./components/Orders";
import Activity from "./components/Activity";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
// import Signup from "./components/Signup.jsx"; 


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/*only login should be accessible */}
      {/* <Route path="/signup" element={<Signup />}/> */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<AddBook />} />
        <Route path="/list-books" element={<ListBook />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/activity" element={<Activity />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
