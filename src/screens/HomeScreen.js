import React, { useContext, useEffect, useState, createContext } from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Swal from 'sweetalert2'

import logOutUserApi from '../api/logOutUserApi'
import getAllTaskApi from '../api/getAllTaskApi'
import { GlobalContext } from '../auth/GlobalContext'
import { columns } from '../components/tableConfiguration'

import '../styles/HomeScreenStyles.css'
import deleteTaskApi from '../api/deleteTaskApi'

export const CheckContext = createContext()
export const HomeScreen = () => {
  const history = useHistory()

  const [dataTable, setDataTable] = useState([])
  const [selectId, setSelectId] = useState(null)

  const { token, setToken } = useContext(GlobalContext)

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
        return Swal.fire('success', 'LogOut successfully', 'success')
      } else {
        return Swal.fire('Error', 'An error has occurred', 'error')
      }
    })
  }

  const handleDeleteClick = event => {
    deleteTaskApi(token, selectId).then(res => {
      if (res.data.success) {
        return Swal.fire('success', 'task deleted successfully', 'success')
      } else {
        return Swal.fire('Error', 'An error has occurred', 'error')
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
  const NewTask = () => {
    history.push('/home/newTask')
  }
  return (
    <div>
      <CheckContext.Provider value={{ selectId, setSelectId }}>
        <div className='generalContainer'>
          <h3 className='textFooter'>Home</h3>
          <section className='containerButtons'>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={ProfileSettings}
            >
              Profile Settings
            </Button>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={ViewProfile}
            >
              Profile
            </Button>

            <Button
              variant='contained'
              size='small'
              color='secondary'
              className='WithButton'
              onClick={logOutSession}
            >
              LogOut
            </Button>
            <section className='secondaryButtonsHome'>
              <article className='ButonMargin'>
                <Button variant='contained' color='primary' onClick={NewTask}>
                  New Task
                  <AddIcon />
                </Button>
              </article>

              <Button
                variant='contained'
                color='secondary'
                onClick={handleDeleteClick}
              >
                Remove Selected
                <DeleteIcon />
              </Button>
            </section>
          </section>
          <section className='tableContainer'>
            <DataGrid
              getRowId={row => row.id}
              rows={filterData}
              columns={columns}
              pageSize={5}
              checkboxSelection={false}
              disableSelectionOnClick
            />
          </section>
          <footer className='FooterContainerHome'>
            <h3 className='textFooter'>Footer</h3>
          </footer>
        </div>
      </CheckContext.Provider>
    </div>
  )
}
