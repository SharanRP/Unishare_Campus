import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../index.css"

const numArray = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

const Semester = ({ userData, setUserData }) => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select
                    required
                    value={userData.semester}
                    label="Semester"
                    onChange={(e) => setUserData({ ...userData, 'semester': e.target.value })}
                >
                    {
                        numArray.map((e, i) => {
                            return (
                                <MenuItem value={i + 1} key={i + 1}>{`Sem ${e}`}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default Semester
