import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {WorktimeInput} from '../../behavior/worktime/types';
import {Field, Form, Formik} from 'formik';
import {worktimeCreation} from '../../behavior/worktime/actions';
import {UserInfo} from '../../behavior/profile/types';

type Props = {
    user: UserInfo;
};

const initialValues: WorktimeInput = {
    userId: '',
    startDate: null,
    finishDate: null,
    lastEditorId: '',
    isAutoCreated: false,
};

export const Timer = ({user}: Props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [buttonText, setButtonText] = useState('Start');

    let timer: NodeJS.Timeout;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('effect');
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

    const toggleTimer = (values: WorktimeInput) => {
        if (isRunning) {
            clearInterval(timer);
            setIsRunning(false);
            initialValues.finishDate = new Date().toISOString();
            setButtonText('Start');
            dispatch(worktimeCreation(values));
        } else {
            setIsRunning(true);
            initialValues.startDate = new Date().toISOString();
            initialValues.userId = user.id;
            initialValues.lastEditorId = user.id;
            setButtonText('Stop');
        }
    };

    useEffect(() => {
        localStorage.setItem('isRunning', isRunning.toString());
    }, [isRunning]);


    return (
        <div className="container">
            <Formik onSubmit={toggleTimer} initialValues={initialValues}>
                <Form>
                    <h1>Worktime</h1>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6 text-center border rounded p-4">
                            <h1 className="mb-4">
                                {hours < 10 ? '0' + hours : hours}:
                                {minutes < 10 ? '0' + minutes : minutes}:
                                {seconds < 10 ? '0' + seconds : seconds}
                            </h1>
                            <button className="btn btn-primary" type="submit">
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
