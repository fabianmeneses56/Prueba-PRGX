import React from 'react'
import { Button } from '@material-ui/core'
import { useFormikContext } from 'formik'

export const AppSubmit = ({ title, isSubmitting }) => {
  const { handleSubmit } = useFormikContext()

  return (
    <Button
      variant='contained'
      size='small'
      color='primary'
      className='WithButton'
      onClick={handleSubmit}
      type='submit'
    >
      {title}
    </Button>
  )
}
