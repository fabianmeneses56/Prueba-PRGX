import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export const GoBackButtom = () => {
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <Button variant='contained' color='secondary' onClick={goBack} size='small'>
      Go back
    </Button>
  )
}
