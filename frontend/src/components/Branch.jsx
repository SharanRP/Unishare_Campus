import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const branchArray = [
    'Computer Science',
    'Information Technology',
    'Electronics & Telecommunication',
    'Electronics',
    'Electrical',
    'Civil',
    'Mechanical',
    'Textile',
    'Production'
]

const Branch = ({ userData, setUserData }) => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select
                    required
                    value={userData.branch}
                    label="Branch"
                    onChange={(e) => setUserData({ ...userData, 'branch': e.target.value })}
                >
                    {
                        branchArray.map((e, i) => {
                            return (
                                <MenuItem value={e} key={i}>{e}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default Branch
