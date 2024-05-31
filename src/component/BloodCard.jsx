// import React from "react";
// import { Btn } from "./Btn";
// import { useNavigate } from "react-router-dom";

// export const BloodCard = ({ data }) => {
//   const navigate = useNavigate();
//   console.log(data);
//   const {
//     bloodGroup,
//     username,
//     email,
//     first_name,
//     last_name,
//     _id,
//     gender,
//     birthDate,
//   } = data;
//   return (
//     <div className=" m-2 rounded-lg p-2  bg-image">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold">{bloodGroup}</h1>
//           <h1 className="text-sm">Blood Group</h1>
//         </div>
//         <div>
//           <h1 className="text-xl font-bold">{username}</h1>
//           <h1 className="text-sm">User Name</h1>
//         </div>
//       </div>
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-base font-bold">{email}</h1>
//           <h1 className="text-sm">Email</h1>
//         </div>
//         <div>
//           <Btn
//             tooltip_text="Details"
//             onclick={() => {
//               navigate(`/${username}`);
//             }}
//             text="View Details"
//             sx={{
//               mx: 0,
//               "@media(max-width: 500px)": {
//                 mx: 0,
//               },
//               fontSize: "x-small",
//               // tex
//               textTransform: "capitalize",

//               p: 0.5,
//               width: "100%",
//               borderBottomRightRadius: 5,
//               borderBottomLeftRadius: 5,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";
import { Btn } from "./Btn";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaTint } from "react-icons/fa";
import { useTheme } from "styled-components";

export const BloodCard = ({ data }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const { bloodGroup, username, email } = data;

  return (
    <div className="m-4 p-6 bg-white rounded-lg shadow-inner border border-black shadow-black max-w-md mx-auto customScr:max-w-full transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-primary-main">
          <FaTint />
          <div>
            <h1 className="text-3xl font-bold">{bloodGroup}</h1>
            <h1 className="text-sm text-gray-600">Blood Group</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-black">
          <FaUser />
          <div>
            <h1 className="text-xl font-bold">{username}</h1>
            <h1 className="text-sm text-gray-600">Username</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <FaEnvelope className="text-blue-500" />
        <div>
          <h1 className="text-base customScr:text-lg text-black font-bold">
            {email}
          </h1>
          <h1 className="text-sm text-gray-600">Email</h1>
        </div>
      </div>
      <div className="text-center mt-4">
        <Btn
          tooltip_text="Details"
          onclick={() => {
            navigate(`/${username}`);
          }}
          text="View Details"
          sx={{
            fontSize: "small",
            padding: "0.2rem",
            width: "100%",
            borderRadius: "0.5rem",
            "hover:": {
              padding: "0.2rem",
            },
            "@media(max-width: 500px)": {
              fontSize: "x-small",
            },
          }}
        />
      </div>
    </div>
  );
};
