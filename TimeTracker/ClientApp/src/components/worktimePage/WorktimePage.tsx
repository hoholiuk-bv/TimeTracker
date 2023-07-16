import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {WorktimeInput} from '../../behavior/worktime/types';
import {Field, Form, Formik} from 'formik';
import {Col, FormLabel, Row} from 'react-bootstrap';
import {FormGroup} from '../common/elements/FormGroup';
import {worktimeCreation} from '../../behavior/worktime/actions';
import {PermissionType, UserInfo} from '../../behavior/profile/types';

type Props = {
    user: UserInfo;
}

const initialValues: WorktimeInput = {
    userId: '',
    startDate: null,
    finishDate: null,
    lastEditorId: '',
    isAutoCreated: false,
};

export const WorktimePage = ({ user }: Props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    let timer: NodeJS.Timeout;
    const dispatch = useDispatch();

 

    useEffect(() => {
        if (isRunning) {
            timer = setInterval(() => {
                setSeconds((s) => {
                    const newSeconds = s + 1;
                    localStorage.setItem('seconds', newSeconds.toString());
                    return newSeconds;
                });
                if (seconds === 59) {
                    setMinutes((m) => {
                        const newMinutes = m + 1;
                        localStorage.setItem('minutes', newMinutes.toString());
                        return newMinutes;
                    });
                    setSeconds(0);
                }
                if (minutes === 59 && seconds === 59) {
                    setHours((h) => {
                        const newHours = h + 1;
                        localStorage.setItem('hours', newHours.toString());
                        return newHours;
                    });
                    setMinutes(0);
                    setSeconds(0);
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning, seconds, minutes]);

  

    const start = () => {
        setIsRunning(true);
        initialValues.startDate = new Date().toISOString();
        initialValues.userId = user.id;
        initialValues.lastEditorId = user.id;
        
    };

    useEffect(() => {
        localStorage.setItem('isRunning', isRunning.toString());
    }, [isRunning]);

    const stop = (values: WorktimeInput) => {
        clearInterval(timer);
        setIsRunning(false);
        initialValues.finishDate = new Date().toISOString();
        console.log(initialValues.startDate);
        console.log(initialValues.finishDate);
        console.log(initialValues.userId);
        console.log(initialValues.lastEditorId);
        console.log(initialValues.isAutoCreated);
        dispatch(worktimeCreation(values));
    };

   /* const onSubmit = (values: WorktimeInput) => {
       
        dispatch(userCreation(values));
    };*/
    return (
        <div className="container">
            <Formik onSubmit={stop} initialValues={initialValues}>
                <Form>
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <h1 className="mb-4">Timer</h1>
                            <h1 className="mb-4">
                                {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
                            </h1>
                            <button className="btn btn-primary mt-2" disabled={isRunning} onClick={start}>
                                Start
                            </button>

                            <button className="btn btn-primary mt-2" disabled={!isRunning} type="submit">Stop</button>
                           
                            
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
