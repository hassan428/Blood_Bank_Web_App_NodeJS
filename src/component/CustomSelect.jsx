import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GiBloodyStash } from "react-icons/gi";
import { bloodGroups } from "../config/bloodGroup_array";

const CustomSelect = ({ getBloodValue }) => {
  const [Group, setGroup] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setGroup(value);
    const { bloodGroup } = bloodGroups.find((obj) => obj.value == value);
    getBloodValue(bloodGroup);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="bloodGroup">
        <GiBloodyStash className="cursor-pointer text-primary-main" />
      </label>
      <FormControl
        required={true}
        variant="standard"
        sx={{ width: "100%", bgcolor: "white", px: 1.5 }}
      >
        <InputLabel id="bloodGroup" sx={{ px: 1 }}>
          Blood Group
        </InputLabel>
        <Select
          labelId="bloodGroup"
          id="bloodGroup"
          value={Group}
          onChange={handleChange}
          label="Blood Group"
        >
          {bloodGroups.map(({ bloodGroup, value }, ind) => {
            return (
              <MenuItem key={ind} value={value}>
                {bloodGroup}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export { CustomSelect };
