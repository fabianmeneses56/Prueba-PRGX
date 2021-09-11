import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import logOutUserApi from '../api/logOutUserApi'
import { GlobalContext } from '../auth/GlobalContext'
import { useHistory } from 'react-router-dom'
import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue
} from '@material-ui/data-grid'

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
  },
  {
    field: '',
    headerName: 'Actions',
    sortable: false,
    width: 220,
    disableClickEventBubbling: true,
    renderCell: params => {
      const onClick = () => {
        const api = params.api
        const fields = api
          .getAllColumns()
          .map(c => c.field)
          .filter(c => c !== '__check__' && !!c)
        const thisRow = {}

        fields.forEach(f => {
          console.log('====================================')
          console.log((f = params.getValue(f)))
          console.log('====================================')
          // thisRow[f] = params.getValue(f)
        })

        // return alert(JSON.stringify(thisRow, null, 4))
      }

      return <Button onClick={onClick}>Click</Button>
    }
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
      _id: res._id,
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
