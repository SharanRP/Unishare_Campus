import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const gradeArray = [['AA', 10], ['AB', 9], ['BB', 8], ['BC', 7], ['CC', 6], ['CD', 5], ['DD', 4]]

const Grades = ({scoreArray, index, credit}) => {

    const [val, setVal] = React.useState(scoreArray[index])

    const handleChange = (e) => {
        scoreArray[index] = [e.target.value,credit]
        setVal(scoreArray[index][0])
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select
                    required
                    label="Grade"
                    value = {val}
                    onChange={handleChange}
                >
                    {
                        gradeArray.map((e, i) => {
                            return (
                                <MenuItem value={e[1]} key={i}>{e[0]}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default Grades
