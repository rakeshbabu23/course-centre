import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Home from "./Home";
import AdminLogin from "./features/admins/AdminLogin";
import AdminSignup from "./features/admins/AdminSignup";
import UserLogin from "./features/users/UserLogin";
import UserSignup from "./features/users/UserSignup";
import AdminDashboard from "./features/admins/AdminDashboard";
import UserDashboard from "./features/users/UserDashboard";
import CourseDetails from "./features/users/CourseDetails";
import PurchasedCourses from "./features/users/PurchasedCourses";
import Payment from "./features/Payment";

export default function CourseApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/admin/signup" element={<AdminSignup />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/users/login" element={<UserLogin />}></Route>
        <Route path="/users/signup" element={<UserSignup />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/users/dashboard" element={<UserDashboard />}></Route>
        <Route
          path="/users/courses/:courseId"
          element={<CourseDetails />}
        ></Route>
        {/* <Route
          isPurchased={isPurchased}
          setIsPurchased={setIsPurchased}
          path="/users/purchasedCourses"
          element={<PurchasedCourses />}
        ></Route>
        <Route
          isPurchased={isPurchased}
          setIsPurchased={setIsPurchased}
          path={isPurchased ? "/users/dashboard" : "/payment"}
          element={isPurchased ? <UserDashboard /> : <Payment />}
        ></Route> */}
        <Route path="/users/purchasedCourses" element={<PurchasedCourses />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}
