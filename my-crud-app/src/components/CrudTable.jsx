import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, Typography, Tooltip, Fade
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const CrudTable = () => {
  const [rows, setRows] = useState([
    { id: 1, login: 'ivan_ivanov', password: 'password123' },
    { id: 2, login: 'petr_petrov', password: 'qwerty456' },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [formData, setFormData] = useState({ login: '', password: '' });

  const handleAddOpen = () => {
    setEditing(false);
    setFormData({ login: '', password: '' });
    setOpen(true);
  };

  const handleEditOpen = (row) => {
    setEditing(true);
    setCurrentRow(row);
    setFormData({ login: row.login, password: row.password });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editing) {
      setRows(prev => prev.map(row => 
        row.id === currentRow.id ? { ...row, ...formData } : row
      ));
    } else {
      const newRow = {
        id: Math.max(...rows.map(row => row.id)) + 1,
        ...formData
      };
      setRows(prev => [...prev, newRow]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setRows(prev => prev.filter(row => row.id !== id));
    }
  };

  const isFormValid = formData.login.trim() && formData.password.trim();

  const tableCellStyle = {
    fontWeight: '500', 
    color: 'text.secondary',
    borderBottom: '1px solid',
    borderColor: 'divider'
  };

  const tableRowStyle = {
    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.01)' },
    '&:last-child td': { borderBottom: 'none' }
  };

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', background: '#fafafa' }}>
      <Fade in timeout={600}>
        <Box sx={{ maxWidth: 1000, margin: '0 auto' }}>
          
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="300" sx={{ mb: 1 }}>
              Пользователи
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
              Управление учетными записями пользователей
            </Typography>
            
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddOpen}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                borderColor: 'text.secondary',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >

              Добавить пользователя
            </Button>
          </Box>

          <TableContainer 
            component={Paper}
            elevation={0}
            sx={{ 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              background: 'white'
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell sx={tableCellStyle}>Логин</TableCell>
                  <TableCell sx={tableCellStyle}>Пароль</TableCell>
                  <TableCell sx={tableCellStyle}>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} sx={tableRowStyle}>
                    <TableCell sx={{ py: 3 }}>
                      <Typography fontWeight="400">{row.login}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 3 }}>
                      <Typography color="text.secondary" fontSize="0.9rem">
                        {row.password}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 3 }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Редактировать" arrow>
                          <IconButton 
                            onClick={() => handleEditOpen(row)}
                            size="small"
                            sx={{ 
                              color: 'text.secondary',
                              '&:hover': { 
                                color: 'primary.main',
                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                              }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить" arrow>
                          <IconButton 
                            onClick={() => handleDelete(row.id)}
                            size="small"
                            sx={{ 
                              color: 'text.secondary',
                              '&:hover': { 
                                color: 'error.main',
                                backgroundColor: 'rgba(211, 47, 47, 0.04)'
                              }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
              sx: { borderRadius: 2, border: '1px solid', borderColor: 'divider' }
            }}
          >
            <DialogTitle sx={{ pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight="400">
                {editing ? 'Редактировать пользователя' : 'Новый пользователь'}
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ py: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  name="login"
                  label="Логин"
                  value={formData.login}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
                <TextField
                  name="password"
                  label="Пароль"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button onClick={handleClose} variant="text" sx={{ borderRadius: 1, px: 3 }}>
                Отмена
              </Button>
              <Button 
                onClick={handleSubmit}
                variant="contained"
                disabled={!isFormValid}
                sx={{ 
                  borderRadius: 1,
                  px: 3,
                  backgroundColor: 'text.primary',
                  '&:hover': { backgroundColor: 'text.primary' }
                }}
              >
                {editing ? 'Сохранить' : 'Создать'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Fade>
    </Box>
  );
};

export default CrudTable;