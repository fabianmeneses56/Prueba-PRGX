import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { createTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

import updateTaskApi from '../api/updateTaskApi'
import deleteTaskApi from '../api/deleteTaskApi'
import { GlobalContext } from '../auth/GlobalContext'
import { CheckContext } from '../screens/HomeScreen'

const defaultTheme = createTheme()
const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: theme.palette.text.secondary
    },
    textPrimary: {
      color: theme.palette.text.primary
    }
  }),
  { defaultTheme }
)

export const columns = [
  {
    field: 'check',
    headerName: 'Check',
    renderCell: RowCheckBox,
    sortable: false,
    width: 180,
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    disableColumnMenu: true,
    disableReorder: true
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'completed',
    headerName: 'Completed',
    width: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    width: 200,
    editable: false,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'updatedAt',
    headerName: 'Updated at',
    editable: false,
    width: 200,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: RowMenuCell,
    sortable: false,
    width: 180,
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    disableColumnMenu: true,
    disableReorder: true
  }
]

export function RowMenuCell(props) {
  const { api, id } = props
  const { token } = useContext(GlobalContext)
  const classes = useStyles()

  const handleEditClick = event => {
    updateTaskApi(token, id).then(res => {
      if (res.data.success) {
        return Swal.fire('success', 'task updated successfully', 'success')
      } else {
        return Swal.fire('Error', 'An error has occurred', 'error')
      }
    })
    event.stopPropagation()
    api.updateRows([{ id, _action: 'update' }])
  }

  const handleDeleteClick = event => {
    deleteTaskApi(token, id).then(res => {
      if (res.data.success) {
        return Swal.fire('success', 'task deleted successfully', 'success')
      } else {
        return Swal.fire('Error', 'An error has occurred', 'error')
      }
    })

    event.stopPropagation()
    api.updateRows([{ id, _action: 'delete' }])
  }

  return (
    <div className={classes.root}>
      <IconButton
        color='inherit'
        className={classes.textPrimary}
        size='small'
        aria-label='edit'
        onClick={handleEditClick}
      >
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton
        color='inherit'
        size='small'
        aria-label='delete'
        onClick={handleDeleteClick}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    </div>
  )
}
function RowCheckBox(props) {
  const { id } = props
  const classes = useStyles()
  const { setSelectId } = useContext(CheckContext)
  const [check, setcheck] = useState(false)

  const handleEnd = event => {
    setcheck(!check)
    setSelectId(id)
  }

  return (
    <div className={classes.root}>
      <IconButton
        color='inherit'
        className={classes.textPrimary}
        size='small'
        aria-label='edit'
        onClick={handleEnd}
      >
        {check ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </IconButton>
    </div>
  )
}

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}
RowCheckBox.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}
