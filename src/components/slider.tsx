import { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { routes } from 'constants/routesConstants'

type TabType = 'auctions' | 'profile' | '' | '/'

const Slider = () => {
  const [activeTab, setActiveTab] = useState<TabType>('auctions')
  const navigate = useNavigate()
  const location = useLocation()

  const { data: userData } = useQuery(['currentUser'], () => API.currentUser())
  const userId = userData?.data?.id


  useEffect(() => {
    if (location.pathname.startsWith('/profile/')) {
      setActiveTab('profile')
    } else if (location.pathname === routes.AUCTIONS) {
      setActiveTab('auctions')
    } else {
      setActiveTab('') 
    }
  }, [location.pathname])

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
    if (tab === 'auctions') {
      navigate(routes.AUCTIONS)
    } else if (tab === 'profile') {
      if (userId) {
        navigate(`${routes.PROFILE}/${userId}`)
      }
    }
  }

  const activeStyle = {
    backgroundColor: '#1e1e1e',
    color: 'white',
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f4',
        borderRadius: '50px',
        padding: '5px',
        width: '250px',
        margin: '20px auto',
      }}
    >
      <Button
        onClick={() => handleTabClick('auctions')}
        sx={{
          flex: 1,
          ...(activeTab === 'auctions' ? activeStyle : { backgroundColor: 'transparent', color: 'gray' }),
          borderRadius: '50px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: activeTab === 'auctions' ? activeStyle.backgroundColor : 'transparent',
          },
          padding: '10px 20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ color: activeTab === 'auctions' ? 'white' : 'gray' }} />
          <Typography variant="body1" sx={{ marginLeft: '8px' }}>
            Auctions
          </Typography>
        </Box>
      </Button>

      <Button
        onClick={() => handleTabClick('profile')}
        sx={{
          flex: 1,
          ...(activeTab === 'profile' ? activeStyle : { backgroundColor: 'transparent', color: 'gray' }),
          borderRadius: '50px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: activeTab === 'profile' ? activeStyle.backgroundColor : 'transparent',
          },
          padding: '10px 20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ color: activeTab === 'profile' ? 'white' : 'gray' }} />
          <Typography variant="body1" sx={{ marginLeft: '8px' }}>
            Profile
          </Typography>
        </Box>
      </Button>
    </Box>
  )
}

export default Slider