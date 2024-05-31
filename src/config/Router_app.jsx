import React from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PrivateRoute } from "../component/PrivateRoute";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { PublicRoute } from "../component/PublicRoute";
import { Home } from "../pages/Home";
import { OtherUserDetails } from "../component/OtherUserDetails";
import { Request } from "../component/Request";
import { OTPInput } from "../pages/Otp_Verify";
import { Layout } from "../component/Layout";
import { New_password } from "../pages/New_password";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path=":username" element={<OtherUserDetails />} />
          <Route path="request" element={<Request />} />
        </Route>
      </Route>

      <Route path="" element={<PublicRoute />}>
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route>
          <Route
            path="verifyOTP"
            element={
              <OTPInput
                route_navigate={"/"}
                apis_end_point={"/verify_otp"}
                localStorageProps={() => localStorage.removeItem("email")}
              />
            }
          />
          <Route
            path="forgetpasswordOTP"
            element={
              <OTPInput
                route_navigate={"/newPassword"}
                apis_end_point={"/forget_password"}
              />
            }
          />
          <Route path="newPassword" element={<New_password />} />
        </Route>
      </Route>
    </Route>
  )
);

export const Router_app = () => {
  return <RouterProvider router={router} />;
};
