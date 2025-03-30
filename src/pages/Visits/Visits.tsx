import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { borderRadius, colors } from '../../styles/theme';
import VisitTable from './VisitTable';
import { getAllVisits, Visit } from '../../services/visitService';
import { showToast } from '../../utils/toast';

const Visits: React.FC = () => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const response = await getAllVisits();
      setVisits(response);
    } catch (error) {
      showToast.error('Failed to fetch visits');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    setDate('');
    setStatus('');
  };

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.text.dark, mb: 3 }}>
        Visits
      </Typography>

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
      </Box>

      <VisitTable 
        visits={visits}
        onSuccess={fetchVisits}
      />
    </Box>
  );
};

export default Visits;
