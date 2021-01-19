// imports
// React Imports
import React from 'react';
import { useState, useEffect } from 'react';
// Types imports
import PropTypes from 'prop-types';
// Materail ui import
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
// Component Imports
import { Step01 } from './Step01';
import { Step02 } from './Step02';
// Redux Imports
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';


const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        flexDirection: 'column',
        height: 22,
        alignItems: 'centre',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});
function QontoStepIcon(props: any) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}
QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};
const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});
function ColorlibStepIcon(props: any) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
    const icons: any = {
        1: <EditIcon />,
        2: <SaveIcon />,
    };
    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}
ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};
function getSteps() {
    return ['Edit', 'Save'];
}
function getStepContent(step: Number, setStep: any, formValues: any, setFormValues: any, updateEditedEntry: any, editedEntry: any, activeDiaryId: any, entry: any) {
    switch (step) {
        case 0:
            return <Step01 submit={setStep} prevValues={formValues} setFormValues={setFormValues} updateEditedEntry={updateEditedEntry} editedEntry={editedEntry} />;
        case 1:
            return <Step02 submit={setStep} prevValues={formValues} setFormValues={setFormValues} activeDiaryId={activeDiaryId} entry={entry} editedEntry={editedEntry} />;
        default:
            return 'Some Error Happened, Start Again';
    }
}
export const Editor = () => {
    // useSelecter to use data from mirage server
    const { currentlyEditing: entry, activeDiaryId } = useSelector((state: RootState) => state.editor);
    // set entry to be edited
    const [editedEntry, updateEditedEntry] = useState(entry);
    // Initial Values
    const initialValues: any = {
        title: editedEntry?.title ?? '',
        content: editedEntry?.content ?? '',
    }
    // Update entry to be edited when ever selected entry changes
    useEffect(() => {
        updateEditedEntry(entry);
    }, [entry]);
    // useStates to be used in the stepper function
    const [activeStep, setActiveStep] = React.useState(0);
    const [formValues, setFormValues] = React.useState(initialValues)
    const steps = getSteps();
    // Stepper Function return
    return (
        <div className="aEContainer">
            <div className="steperContainer1">
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep, setActiveStep, formValues, setFormValues, updateEditedEntry, editedEntry, activeDiaryId, entry)}
            </div>
        </div>
    );
}