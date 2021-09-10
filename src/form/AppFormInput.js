import React from 'react'
import { useFormikContext } from 'formik'
import { TextField, Button } from '@material-ui/core'

export const AppFormInput = ({ label, name, ...otherProps }) => {
  const { handleBlur, handleChange, setFieldValue, errors, touched, values } =
    useFormikContext()

  const errorAux = errors[name]
  const visible = touched[name]
  return (
    <>
      {!errorAux || !visible ? (
        <TextField
          id='standard-basic'
          label={label}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values[name]}
          name={name}
        />
      ) : (
        <TextField
          error
          id='standard-basic'
          label='Error'
          helperText={errorAux}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values[name]}
          name={name}
        />
      )}
    </>
  )
}
