import React from 'react'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { syllabus } from '../Syllabus/Parent'
import Grades from './Grades';
import useMediaQuery from '@mui/material/useMediaQuery';
import "../index.css";

const Subjects = ({ userData, pointer, setPointer, handleNext }) => {
    const syllabusArray = syllabus[userData.semester][userData.branch]
    const scoreArray = Array.apply(null, Array(syllabusArray.length)).map(String.prototype.valueOf, "")
    const matches = useMediaQuery('(max-width:600px)');

    var totalCreds = 0
    for (let i = 0; i < syllabusArray.length; i++) {
        totalCreds = (totalCreds + syllabusArray[i][1])
    }

    const handleScore = () => {
        var sum = 0
        for (let i = 0; i < scoreArray.length; i++) {
            sum = sum + (scoreArray[i][0] * scoreArray[i][1])
        }

        if (isNaN(sum / totalCreds)) {
            alert('Fill all the fields!')
        } else {
            setPointer(sum / totalCreds)
            handleNext()
        }
    }

    return (
        <div>
            <h2 className='heading'>{`${userData.branch} - Semester ${userData.semester}`}</h2>
            {
                syllabusArray.map((elem, i) => {
                    return (
                        <div key={i}>
                            <div className='listGrid'>
                                <div>
                                    <p>{elem[0]}</p>
                                    <i><p style={{color: 'grey', fontSize: '13px', marginTop: '5px'}}>{`${elem[1]} Credit`}</p></i>
                                </div>
                                <Grades scoreArray={scoreArray} index={i} credit={elem[1]} />
                            </div>
                            {
                                !matches ? <Divider /> : null
                            }
                        </div>
                    )
                })
            }
            <div className='finishButton '>
                <Button onClick={handleScore}>Finish</Button>
            </div>
        </div>

    )
}

export default Subjects
