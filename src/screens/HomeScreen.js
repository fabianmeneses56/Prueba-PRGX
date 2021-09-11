import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import logOutUserApi from '../api/logOutUserApi'
import { GlobalContext } from '../auth/GlobalContext'
import { useHistory } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'

import '../styles/HomeScreenStyles.css'
import getAllTaskApi from '../api/getAllTaskApi'

const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
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
  }
]

export const HomeScreen = () => {
  const history = useHistory()
  const [dataTable, setDataTable] = useState([])

  const { token, setToken } = useContext(GlobalContext)
  console.log(token)
  useEffect(() => {
    getAllTaskApi(token).then(res => setDataTable(res.data.data))
    // getAllTaskApi().then((res) => setstate())
  }, [token])

  console.log('====================================')
  const filterData = dataTable.map(res => {
    return {
      _id: res._id,
      description: res.description,
      completed: res.completed,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt
    }
  })
  console.log(filterData)
  console.log('====================================')
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
          getRowId={row => row._id}
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
