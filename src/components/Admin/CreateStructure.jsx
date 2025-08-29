import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Grid,
  useTheme,
  useMediaQuery,
  Switch,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CreateStructure = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDefault, setIsDefault] = useState(false);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleSwitchChange = (event) => {
    setIsDefault(event.target.checked);
  };

  const salaryStructures = [
    { name: 'Salary Structure', employees: '5 Employees' },
    { name: 'Job based Wage', employees: 'No Employees' },
    { name: 'Daily Wage_1 / Advanced', employees: 'No Employees' },
    { name: 'Hourly Wage_1 / Advanced', employees: 'No Employees' },
  ];

  const renderTableColumns = () => {
    if (selectedItem === 'Job based Wage' || selectedItem === 'Daily Wage_1 / Advanced' || selectedItem === 'Hourly Wage_1 / Advanced') {
      return (
        <>
          <TableCell sx={{ fontWeight: '600', color: '#039BE5', fontSize: '16px', borderRight: '1px solid #ddd' }}>
            Salary Components
          </TableCell>
          <TableCell sx={{ fontWeight: '600', color: '#039BE5', fontSize: '16px' }}>
            Calculation
          </TableCell>
        </>
      );
    }
    return (
      <>
        <TableCell sx={{ fontWeight: '600', color: '#039BE5', fontSize: '16px', borderRight: '1px solid #ddd' }}>
          Earnings
        </TableCell>
        <TableCell sx={{ fontWeight: '600', color: '#039BE5', fontSize: '16px', borderRight: '1px solid #ddd' }}>
          Calculation
        </TableCell>
        <TableCell sx={{ fontWeight: '600', color: '#039BE5', fontSize: '16px', borderRight: '1px solid #ddd' }}>
          Deductions
        </TableCell>
        <TableCell sx={{ fontWeight: '600', color: '#039BE5', fontSize: '16px' }}>
          Calculation
        </TableCell>
      </>
    );
  };

  const renderTableRows = () => {
    const data = selectedItem === 'Job based Wage'
      ? [
          { earning: 'Job Based Wage', calculationEarning: 'CTC' },
          { earning: 'Overtime (rate per hour)', calculationEarning: '100' },
        ]
      : selectedItem === 'Daily Wage_1 / Advanced'
      ? [
          { earning: 'Basic', calculationEarning: 'CTC * 0.6' },
          { earning: 'HRA', calculationEarning: 'BASIC * 0.4' },
          { earning: 'PF Employer', calculationEarning: 'System Calculated' },
          { earning: 'ESI Employer', calculationEarning: 'System Calculated' },
          { earning: 'Special allowance', calculationEarning: 'Balancing Amount of CTC' },
          { earning: 'Overtime (rate per hour)', calculationEarning: '100' },
        ]
      : selectedItem === 'Hourly Wage_1 / Advanced'
      ? [
          { earning: 'Basic', calculationEarning: 'CTC * 0.6' },
          { earning: 'HRA', calculationEarning: 'BASIC * 0.4' },
          { earning: 'PF Employer', calculationEarning: 'System Calculated' },
          { earning: 'ESI Employer', calculationEarning: 'System Calculated' },
          { earning: 'Special allowance', calculationEarning: 'Balancing Amount of CTC' },
          { earning: 'Overtime (rate per hour)', calculationEarning: '100' },
        ]
      : [
          {
            earning: 'Basic',
            calculationEarning: 'CTC * 0.6',
            deduction: 'PF Employer',
            calculationDeduction: 'System Calculated',
          },
          {
            earning: 'HRA',
            calculationEarning: 'CTC * 0.4',
            deduction: 'ESI Employer',
            calculationDeduction: 'System Calculated',
          },
          {
            earning: 'Special allowance',
            calculationEarning: 'Balancing Amount of CTC',
            deduction: '',
            calculationDeduction: '',
          },
        ];

    return data.map((row) => (
      <TableRow key={row.earning}>
        <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.earning}</TableCell>
        <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.calculationEarning}</TableCell>
        {selectedItem !== 'Job based Wage' && selectedItem !== 'Daily Wage_1 / Advanced' && selectedItem !== 'Hourly Wage_1 / Advanced' && (
          <>
            <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.deduction}</TableCell>
            <TableCell>{row.calculationDeduction}</TableCell>
          </>
        )}
      </TableRow>
    ));
  };

  return (
    <Paper sx={{ display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List>
              {salaryStructures.map((item, index) => (
                <React.Fragment key={item.name}>
                  <ListItem
                    button
                    onClick={() => handleItemClick(item.name)}
                    sx={{
                      border: '1px solid green',
                      borderRadius: 1,
                      mb: 1,
                      backgroundColor: selectedItem === item.name ? 'lightgreen' : 'transparent',
                      '&:hover': {
                        backgroundColor: selectedItem === item.name ? 'lightgreen' : '#f5f5f5',
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={item.employees}
                      primaryTypographyProps={{
                        fontWeight: 'bold',
                        color: selectedItem === item.name ? 'green' : 'text.secondary',
                      }}
                      secondaryTypographyProps={{ color: selectedItem === item.name ? 'green' : 'text.secondary' }}
                    />
                  </ListItem>
                  {index < 3 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ padding: 2, flexGrow: 1 }}>
              <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} fullWidth>
                Create New Structure
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: '600', color: 'grey' }}>
                {selectedItem || 'Salary Structure'}
              </Typography>
              <Link href="#" variant="body2">
                Download Sample Format
              </Link>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: '600', color: 'grey', fontSize: '17px' }}>
                  Overview
                </Typography>
                <Divider sx={{ border: '2px solid #039BE5' }} />
              </Box>

              {selectedItem === 'Job based Wage' || selectedItem === 'Daily Wage_1 / Advanced' || selectedItem === 'Hourly Wage_1 / Advanced' ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Switch
                    checked={isDefault}
                    onChange={handleSwitchChange}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label="Set as Company Default"
                    sx={{ backgroundColor: '#1E88E5', color: 'white' }} 
                  />
                </Box>
              ) : (
                <>
                  {selectedItem && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label="Company Default" 
                        color="success" 
                        icon={<CheckCircleOutlineIcon />} 
                      />
                      <Chip 
                        label="Remove" 
                        color="error" 
                        icon={<RemoveCircleOutlineIcon />} 
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
            <Divider sx={{ height: '2rem', mt: '-1rem' }} />
            <Box>
              <Typography variant="subtitle1">Salary Structure Name</Typography>
              <Typography variant="body2" sx={{ color: 'grey', fontSize: '16px' }}>
                {selectedItem || 'Salary Structure'}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: 'grey', fontSize: '17px' }}>
                Description
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey', fontSize: '16px' }}>
                {selectedItem ? 'Detailed description about the selected structure.' : 'Select a structure to view details.'}
              </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
                    {renderTableColumns()}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderTableRows()}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateStructure;
