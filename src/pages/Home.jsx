import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BloodCard } from "../component/BloodCard";
import { setLoginSuccess } from "../store/slices/userLoggedSlice";
import { CustomLoader } from "../component/CustomLoader";
import { Input_field } from "../component/Input_field";
import { FaSearch } from "react-icons/fa";
import { Btn } from "../component/Btn";
import { IconButton } from "@mui/material";
import { useTheme } from "styled-components";
import { ErrorMessage } from "../component/ErrorMessage";
import { stop_loader } from "../store/slices/loaderSlice";

export const Home = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const anOtheruserData = useSelector(({ anOtheruserData }) => anOtheruserData);
  // const { userData, anOtheruserData } = store;
  const [searchValue, setSearchValue] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [renderData, setRenderData] = useState(anOtheruserData);
  const [renderError, setRenderError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("No Users Found");
  const [allUserBtn, setAllUserBtn] = useState(false);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(stop_loader(false));
  }, 2000);

  const input_value = (value, id) => {
    setInputValue(value);
    value = value.toLowerCase();
    setSearchValue({ ...searchValue, [id]: value });
  };

  const searchHandle = () => {
    if (inputValue == "") {
      setRenderData(anOtheruserData);
      setRenderError(false);
    }
    setInputValue("");

    let searchedFilter = anOtheruserData.filter((obj) => {
      if (obj.email.toLowerCase() == searchValue.search) {
        return obj;
      } else if (obj.username.toLowerCase() == searchValue.search) {
        return obj;
      } else if (obj.bloodGroup.toLowerCase() == searchValue.search) {
        return obj;
      }
    });

    if (searchedFilter.length == 0) {
      setRenderError(true);
      setErrorMsg("No User Found");
      setAllUserBtn(true);
    } else {
      setRenderData(searchedFilter);
      setRenderError(false);
      setAllUserBtn(true);
    }
    // console.log(searchedFilter);
  };
  // console.log(renderData);

  const allUserHandle = () => {
    setAllUserBtn(false);
    setRenderError(false);
    setRenderData(anOtheruserData);
  };

  return anOtheruserData.length !== 0 ? (
    <div>
      <div className="flex justify-end items-center m-2">
        <div>
          <Input_field
            placeholder="Search User"
            val={inputValue}
            id="search"
            classname="bg-secondary-main"
            input_value={input_value}
          />
        </div>
        <IconButton
          onClick={searchHandle}
          sx={{
            bgcolor: primary.main,
            color: secondary.main,
            ml: 0.5,
            fontWeight: "bold",
            border: `2px solid ${secondary.main}`,
            ":hover": {
              bgcolor: secondary.main,
              color: primary.main,
              border: `2px solid ${primary.main}`,
            },
          }}
        >
          <FaSearch className="text-base" />
          {/* <Btn startIcon={} tooltip_text="Search" /> */}
        </IconButton>
      </div>
      {allUserBtn ? (
        <div className="text-right m-2">
          <Btn
            text="All User"
            tooltip_text="All User"
            sx={{
              fontSize: "small",
              textTransform: "capitalize",
              "@media(max-width: 500px)": {
                fontSize: "small",
                ml: 0.5,
              },
            }}
            onclick={allUserHandle}
          />
        </div>
      ) : null}

      {renderError ? (
        <ErrorMessage errorMsg={errorMsg} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 container p-2 m-auto">
          {renderData.map((obj, ind) => (
            <BloodCard key={ind} data={obj} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <ErrorMessage errorMsg={errorMsg} />
  );
};
