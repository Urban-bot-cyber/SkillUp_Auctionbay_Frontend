import { routes } from 'constants/routesConstants'
import { FC, useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import authStore from 'stores/auth.store'
import Toast from 'react-bootstrap/Toast'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'
import { IconButton, Avatar, Box, AppBar, Toolbar, Button, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import { Modal } from 'react-bootstrap'
import UpdateUserForm from 'components/user/UpdateUserForm'

const Navbar: FC = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)


  const handleAvatarClick = () => {
    setIsPopoverOpen((prev) => !prev)
  }
  
  const singout = async () => {
    const response = await API.signout()
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.signout()
      navigate('/')
    }
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <header>
        <AppBar position="static" style={{ background: 'white', boxShadow: 'none', padding: '10px' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link className="navbar-brand mt-0" to={routes.HOME}>
              <img src="/images/logo.png" alt="auctionbay" width={90} />
            </Link>

            {authStore.user ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '10px',
                  borderRadius: '50px',
                  backgroundColor: '#F6F6F4',
                }}
              >
                {}
                <IconButton
                  sx={{
                    backgroundColor: '#f1f3f4',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'black',
                      '& svg': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <NotificationsIcon sx={{ color: 'black' }} />
                </IconButton>

                {}
                <IconButton
                  sx={{
                    backgroundColor: '#F4FF47',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'black',
                      '& svg': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <AddIcon sx={{ color: 'black' }} />
                </IconButton>

                {}
                <div onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                  <Avatar src="/path-to-image.jpg" alt="User" />
                </div>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <NavLink
                  to={routes.LOGIN}
                  style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '16px' }}
                >
                  Log in
                </NavLink>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>or</Typography>
                <NavLink
                  to={routes.SIGNUP}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: 'black',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                  }}
                >
                  Sign Up
                </NavLink>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </header>

      {}
      {isPopoverOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '60px', 
            right: '20px',
            padding: '10px',
            backgroundColor: 'white',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            zIndex: 1000,
            color: 'black',
          }}
        >
            <Button
              onClick={handleOpenModal}
              startIcon={<SettingsIcon />}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                color: 'black',
                marginBottom: '10px',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
              }}
            >
              Profile settings
            </Button>
          <link/>
          <Button
            onClick={singout}
            fullWidth
            sx={{
              justifyContent: 'center',
              textTransform: 'none',
              color: 'black',
              border: '1px solid black',
              borderRadius: '50px',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            }}
          >
            Log out
          </Button>
        </Box>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <UpdateUserForm defaultValues={authStore.user} onCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>

      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default Navbar
