import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Add as AddIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { borderRadius, colors } from '../../styles/theme';
import BuildingTable from './BuildingTable';
import NewBuilding from './NewBuilding';
import EditBuilding from './EditBuilding';
import ViewBuilding from './ViewBuilding';
import { getAllBuildings, Building } from '../../services/buildingService';
import { showToast } from '../../utils/toast';

const Buildings: React.FC = () => {
  const [date, setDate] = useState('');
  const [manager, setManager] = useState('');
  const [status, setStatus] = useState('');
  const [isNewBuildingModalOpen, setIsNewBuildingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await getAllBuildings();
      setBuildings(response);
    } catch (error) {
      showToast.error('Failed to fetch buildings');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    setDate('');
    setManager('');
    setStatus('');
  };

  const handleEditBuilding = (building: Building) => {
    setSelectedBuilding(building);
    setIsEditModalOpen(true);
  };

  const handleViewBuilding = (building: Building) => {
    setSelectedBuilding(building);
    setIsViewModalOpen(true);
  };

  return (
    <Box p={3}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <ButtonGroup sx={{ gap: 1 }}>
          <Button
            startIcon={<FilterIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              borderRadius: borderRadius.main,
              border: `1px solid ${colors.border.main}`,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Filter By
          </Button>

          <Button
            endIcon={<ArrowDownIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              borderRadius: borderRadius.main,
              border: `1px solid ${colors.border.main}`,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Date
          </Button>

          <Button
            endIcon={<ArrowDownIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              borderRadius: borderRadius.main,
              border: `1px solid ${colors.border.main}`,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Manager
          </Button>

          <Button
            endIcon={<ArrowDownIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              borderRadius: borderRadius.main,
              border: `1px solid ${colors.border.main}`,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Status
          </Button>

          <Button
            startIcon={<span style={{ color: colors.primary.main }}>↻</span>}
            onClick={handleResetFilter}
            sx={{ 
              color: colors.primary.main,
              bgcolor: colors.background.paper,
              borderRadius: borderRadius.main,
              border: `1px solid ${colors.border.main}`,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Reset Filter
          </Button>
        </ButtonGroup>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsNewBuildingModalOpen(true)}
          sx={{
            bgcolor: colors.primary.main,
            borderRadius: borderRadius.main,
            fontWeight: 'bold',
            '&:hover': { bgcolor: colors.primary.dark }
          }}
        >
          Add New Building
        </Button>
      </Box>

      <BuildingTable 
        buildings={buildings}
        onView={handleViewBuilding}
        onEdit={handleEditBuilding}
        onSuccess={fetchBuildings}
      />

      <NewBuilding
        open={isNewBuildingModalOpen}
        onClose={() => setIsNewBuildingModalOpen(false)}
        onSuccess={fetchBuildings}
      />

      <EditBuilding
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBuilding(null);
        }}
        onSuccess={fetchBuildings}
        building={selectedBuilding}
      />

      <ViewBuilding
        open={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedBuilding(null);
        }}
        building={selectedBuilding}
      />
    </Box>
  );
};

export default Buildings;
