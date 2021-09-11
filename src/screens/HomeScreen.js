import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import { Button } from '@material-ui/core'
import logOutUserApi from '../api/logOutUserApi'
import { GlobalContext } from '../auth/GlobalContext'
import { useHistory } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { createTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

import '../styles/HomeScreenStyles.css'
import getAllTaskApi from '../api/getAllTaskApi'
import deleteTaskApi from '../api/deleteTaskApi'
import updateTaskApi from '../api/updateTaskApi'

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

function RowMenuCell(props) {
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

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

const columns = [
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: false
  },
  {
    field: 'completed',
    headerName: 'Completed',
    width: 150,
    editable: false
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    width: 200,
    editable: false
  },
  {
    field: 'updatedAt',
    headerName: 'Updated at',
    editable: false,
    width: 200
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

export const HomeScreen = () => {
  const history = useHistory()
  const [dataTable, setDataTable] = useState([])

  const { token, setToken } = useContext(GlobalContext)
  console.log(token)
  useEffect(() => {
    getAllTaskApi(token).then(res => setDataTable(res.data.data))
  }, [token])

  const filterData = dataTable.map(res => {
    return {
      id: res._id,
      description: res.description,
      completed: res.completed,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt
    }
  })

  const logOutSession = () => {
    logOutUserApi(token).then(res => {
      if (res.data.success) {
        setToken(null)
        storageLogOut()
      }
    })
  }

  const storageLogOut = async () => {
    ;(await process.browser) && window.sessionStorage.removeItem('secret_key')
  }

  const ViewProfile = () => {
    history.push('/home/profile')
  }
  const ProfileSettings = () => {
    history.push('/home/profileSettings')
  }
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Button
          variant='contained'
          size='small'
          color='secondary'
          className='WithButton'
          onClick={logOutSession}
        >
          LogOut
        </Button>
        <Button
          variant='contained'
          size='small'
          color='primary'
          className='WithButton'
          onClick={ViewProfile}
        >
          Profile
        </Button>
        <Button
          variant='contained'
          size='small'
          color='primary'
          className='WithButton'
          onClick={ProfileSettings}
        >
          Profile Settings
        </Button>
      </div>
      <div className='tableContainer'>
        <DataGrid
          getRowId={row => row.id}
          rows={filterData}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  )
}
