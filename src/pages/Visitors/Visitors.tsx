import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  IconButton,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Add as AddIcon,
  KeyboardArrowDown as ArrowDownIcon,
  View as ViewIcon,
} from '@mui/icons-material';
import { borderRadius, colors } from '../../styles/theme';
import VisitorTable from './VisitorTable';
import { getAllVisitors, Visitor } from '../../services/visitorService';
import { showToast } from '../../utils/toast';
import NewVisitor from './NewVisitor';
import EditVisitor from './EditVisitor';
import ViewVisitor from './ViewVisitor';

const Visitors: React.FC = () => {
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [isNewVisitorModalOpen, setIsNewVisitorModalOpen] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const response = await getAllVisitors();
      setVisitors(response);
    } catch (error) {
      showToast.error('Failed to fetch visitors');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    setDate('');
    setGender('');
    setRegion('');
  };

  const handleEditVisitor = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setIsEditModalOpen(true);
  };

  const handleViewVisitor = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setIsViewModalOpen(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.text.dark, mb: 3 }}>
        Visitors
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
            Gender
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
            Region
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
          onClick={() => setIsNewVisitorModalOpen(true)}
          sx={{
            bgcolor: colors.primary.main,
            borderRadius: borderRadius.main,
            fontWeight: 'bold',
            '&:hover': { bgcolor: colors.primary.dark }
          }}
        >
          Add New Visitor
        </Button>
      </Box>

      <VisitorTable 
        visitors={visitors}
        onEdit={handleEditVisitor}
        onSuccess={fetchVisitors}
        onView={handleViewVisitor}
      />
      <NewVisitor
        open={isNewVisitorModalOpen}
        onClose={() => setIsNewVisitorModalOpen(false)}
        onSuccess={fetchVisitors}
      />
      <EditVisitor
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchVisitors}
        visitor={selectedVisitor}
      />
      <ViewVisitor
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        visitor={selectedVisitor}
      />
    </Box>
  );
};

export default Visitors;
