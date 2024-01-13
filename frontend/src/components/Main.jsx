
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Semester from './Semester';
import Branch from './Branch';
import Subjects from './Subject';
import Result from './Result';
import "../index.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const steps = ['Select Semester', 'Select Branch', 'Enter Grades'];

const Main = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [pointer, setPointer] = React.useState(0);
    const matches = useMediaQuery('(max-width:600px)');
    const [userData, setUserData] = React.useState({
        semester: '',
        branch: '',
    });

    const handleNext = () => {

        if (activeStep === 0 && userData.semester === '') {
            setErrorMessage('Please select a semester before proceeding!')
            setOpen(true);
            return;
        } else if (activeStep === 1 && userData.branch === '') {
            setErrorMessage('Please select a branch before proceeding!')
            setOpen(true);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setUserData({
            semester: '',
            branch: '',
            grades: '',
        })
        setPointer(0);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0: return (<Semester userData={userData} setUserData={setUserData} />);
            case 1: return (<Branch userData={userData} setUserData={setUserData} />);
            case 2: return (<Subjects userData={userData} pointer={pointer} setPointer={setPointer} handleNext={handleNext} />);
            default: return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>

            <div className='stepper-wrapper'>
                <Stepper activeStep={activeStep} orientation={matches ? 'vertical' : 'horizontal'}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                {matches ? <StepContent>{getStepContent(index)}</StepContent> : null}
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
            {
                !matches ? getStepContent(activeStep) : null
            }
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Result pointer={pointer} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                <div className='buttons' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        <ArrowBackIcon />
                        Back
                    </Button>
                    {
                        activeStep === steps.length - 1 ? null :
                            <Button onClick={handleNext} className='item-center'>
                                Next
                                <ArrowForwardIcon />
                            </Button>
                    }
                </div>
                </React.Fragment>
            )}
        </Box>
    );
}

export default Main
