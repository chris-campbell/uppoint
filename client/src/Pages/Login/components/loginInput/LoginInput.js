import React from 'react'
import TextField from "@material-ui/core/TextField";

function LoginInput({onChange, type, placeholder}) {
  return (
    <TextField
      type={type}
      variant="outlined"
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default LoginInput
