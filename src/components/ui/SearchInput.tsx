import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "var(--neutral-disabled)" }} />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        sx: {
          color: "var(--neutral-disabled)", // Колір лейблу
        },
      }}
      sx={{
        marginBottom: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "4px",
          width: "327px",
          height: "44px",
          backgroundColor: "var(--neutral-dark)",
          color: "var(--neutral-disabled)",
        },
      }}
    />
  );
};

export default SearchInput;
