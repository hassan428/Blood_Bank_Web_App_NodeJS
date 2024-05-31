// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useTheme } from "styled-components";
// import { Btn } from "./Btn";

// export const OtherUserDetails = () => {
//   const theme = useTheme();
//   const { primary, secondary } = theme.palette;
//   const param = useParams();
//   const { anOtheruserData } = useSelector((store) => store);

//   const selectedDetails = anOtheruserData.find(
//     (obj) => obj.username == param.username
//   );

//   const {
//     bloodGroup,
//     username,
//     email,
//     first_name,
//     last_name,
//     _id,
//     gender,
//     birthDate,
//   } = selectedDetails;

//   const fullDate = new Date(birthDate).toString();
//   let adjustedDate;

//   for (let i = 0; i < fullDate.length; i++) {
//     if (fullDate[i] === "G") {
//       adjustedDate = fullDate.slice(0, i - 9);
//     }
//   }

//   return (
//     <>
//       <h1 className="text-2xl font-bold sm:text-3xl bg-primary-main mt-2 p-2">
//         Profile Details
//       </h1>
//       <hr />
//       <div className="container p-2 text-xl">
//         <div className="flex items-center">
//           <h1 className="m-2 text-primary-main">Blood Group:</h1>
//           <h1 className="m-2 font-bold  rounded ">{bloodGroup}</h1>
//         </div>

//         <div className="flex items-center">
//           <h1 className="m-2 text-primary-main">Username:</h1>
//           <h1 className="m-2 font-bold  rounded ">{username}</h1>
//         </div>

//         <div className="flex items-center">
//           <h1 className="m-2 text-primary-main">Full Name:</h1>
//           <h1 className="m-2 font-bold  rounded ">
//             {first_name + " " + last_name}
//           </h1>
//         </div>

//         <div className="flex items-center">
//           <h1 className="m-2 text-primary-main">Gender:</h1>
//           <h1 className="m-2 font-bold  rounded ">{gender}</h1>
//         </div>
//         <div className="flex items-center">
//           <h1 className="m-2 text-primary-main">Email Address:</h1>
//           <h1 className="m-2 font-bold  rounded ">{email}</h1>
//         </div>

//         <div className="flex items-center">
//           <h1 className="m-2 text-primary-main">Date OF Birth:</h1>
//           <h1 className="m-2 font-bold rounded ">{adjustedDate}</h1>
//         </div>

//         <div className=" m-3">
//           <Btn
//             tooltip_text="Request"
//             // onclick={request}
//             text="Send Request"
//             sx={{
//               "@media(max-width: 500px)": {
//                 fontSize: "small",
//               },
//               fontSize: "small",
//               textTransform: "capitalize",
//               borderBottomRightRadius: 5,
//               borderBottomLeftRadius: 5,
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { Btn } from "./Btn";
import styled from "styled-components";

const ProfileContainer = styled.div`
  padding: 2rem;
  background-color: ${(props) => props.theme.palette.background.paper};
  border-radius: 16px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: 1.5rem;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.palette.background.default};
  border-radius: 8px;
`;

const Label = styled.h2`
  font-size: 1.25rem;
  color: ${(props) => props.theme.palette.text.primary};
`;

const Value = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

export const OtherUserDetails = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const param = useParams();
  const { anOtheruserData } = useSelector((store) => store);

  const selectedDetails = anOtheruserData.find(
    (obj) => obj.username === param.username
  );

  if (!selectedDetails) {
    return <h1>User not found</h1>;
  }

  const {
    bloodGroup,
    username,
    email,
    first_name,
    last_name,
    gender,
    birthDate,
  } = selectedDetails;

  const adjustedDate = new Date(birthDate).toDateString();

  return (
    <ProfileContainer>
      <Title>Profile Details</Title>
      <hr />
      <DetailContainer>
        <Label>Blood Group:</Label>
        <Value>{bloodGroup}</Value>
      </DetailContainer>
      <DetailContainer>
        <Label>Username:</Label>
        <Value>{username}</Value>
      </DetailContainer>
      <DetailContainer>
        <Label>Full Name:</Label>
        <Value>{`${first_name} ${last_name}`}</Value>
      </DetailContainer>
      <DetailContainer>
        <Label>Gender:</Label>
        <Value>{gender}</Value>
      </DetailContainer>
      <DetailContainer>
        <Label>Email Address:</Label>
        <Value>{email}</Value>
      </DetailContainer>
      <DetailContainer>
        <Label>Date of Birth:</Label>
        <Value>{adjustedDate}</Value>
      </DetailContainer>
      <ButtonContainer>
        <Btn
          tooltip_text="Request"
          text="Send Request"
          sx={{
            "@media(max-width: 500px)": {
              fontSize: "small",
            },
            fontSize: "medium",
            textTransform: "capitalize",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        />
      </ButtonContainer>
    </ProfileContainer>
  );
};
