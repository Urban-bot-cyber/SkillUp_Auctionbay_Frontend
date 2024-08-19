import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

type TabType = 'auctions' | 'profile'

const Slider = () => {
  const [activeTab, setActiveTab] = useState<TabType>('auctions')
  const navigate = useNavigate()  // Initialize useNavigate

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
    if (tab === 'auctions') {
      navigate(routes.AUCTIONS)  // Navigate to auctions route
    } else if (tab === 'profile') {
      navigate(routes.PROFILE)  // Navigate to profile route
    }
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
          backgroundColor: activeTab === 'auctions' ? '#f1f3f4' : 'transparent',
          color: activeTab === 'auctions' ? 'black' : 'gray',
          borderRadius: '50px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: activeTab === 'auctions' ? '#f1f3f4' : 'transparent',
          },
          padding: '10px 20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ color: activeTab === 'auctions' ? 'black' : 'gray' }} />
          <Typography variant="body1" sx={{ marginLeft: '8px' }}>
            Auctions
          </Typography>
        </Box>
      </Button>

      <Button
        onClick={() => handleTabClick('profile')}
        sx={{
          flex: 1,
          backgroundColor: activeTab === 'profile' ? '#1e1e1e' : 'transparent',
          color: activeTab === 'profile' ? 'white' : 'gray',
          borderRadius: '50px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: activeTab === 'profile' ? '#1e1e1e' : 'transparent',
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
