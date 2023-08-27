import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {WorktimeRecord, WorktimeInput} from '../../behavior/worktime/types';
import {Form, Formik} from 'formik';
import {
    unfinishedWorktimeRecordReceived,
    requestUnfinishedWorktimeRecord,
    requestWorktimeFinishDateUpdate,
    worktimeCreation
} from '../../behavior/worktime/actions';
import {UserInfo} from '../../behavior/profile/types';
import '../../custom.css';

type Props = {
    user: UserInfo,
    worktime: WorktimeRecord | null;
};

const initialValues: WorktimeInput = {
    userId: localStorage.getItem('userId') || null,
    startDate: null,
    finishDate: null,
    lastEditorId: localStorage.getItem('editorId') || null,
};

export const Timer = ({user, worktime}: Props) => {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [buttonText, setButtonText] = useState('Start');
    const [showSessionStartMessage, setShowSessionStartMessage] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [startDateAsTimestamp, setStartDateAsTimestamp] = useState(false);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endMessage, setEndMessage] = useState(false);

    const timerKey = 'timerData';
    const storedTimerData = localStorage.getItem(timerKey);

    let timer: NodeJS.Timeout | null = null;

    const handleBeforeUnload = () => {
        if (isRunning && timer) {
            clearInterval(timer);
            const remainingTime = seconds + minutes * 60 + hours * 3600;
        }
    };

    useEffect(() => {
        if (isRunning && !timer) {
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

        return () => {
            handleBeforeUnload();
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };
    }, [isRunning, seconds, minutes]);

    const toggleTimer = (values: WorktimeInput) => {
        if (isRunning) {
            // clearInterval(timer!);
            setIsRunning(false);
            setButtonText('Start');
            dispatch(requestWorktimeFinishDateUpdate(user.id));
            setStartDate(null);
            setIsStopped(true);
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setShowSessionStartMessage(false);
            setIsStopped(true);
            setEndMessage(false);

        } else {
            setIsRunning(true);
            initialValues.startDate = new Date().toISOString();
            initialValues.userId = user.id;
            initialValues.lastEditorId = user.id;
            const buttonText = 'Stop' ?? '';
            setButtonText('Stop');
            dispatch(worktimeCreation(values));

            setShowSessionStartMessage(true);
            setIsStopped(false);
            setEndMessage(true);

        }
    };


    useEffect(() => {
        console.log(worktime?.startDate);
        const buttonText = worktime?.startDate ? 'Stop' : 'Start';
        setButtonText(buttonText);
        const run = worktime?.startDate ? true : false;
        setIsRunning(run);
    }, [worktime?.startDate]);

    useEffect(() => {
        if (isRunning != false) {
            setEndMessage(true);
        }
    });

    

    return (
        <div className="container">
            <Formik onSubmit={toggleTimer} initialValues={initialValues}>
                <Form>
                    <div>
                        <div className="start-button">
                            <button className="btn btn-primary fixed-size-button" type="submit">
                                {buttonText}
                            </button>
                        </div>
                        <div className='start-message'>
                        {endMessage &&
                            <div className='session-start-message'>{(worktime?.startDate) &&
                                <div
                                    className={'alert alert-success text-white rounded d-flex justify-content-between align-items-center'}>
                                    <p className="m-0">
                                        session start
                                        at {worktime?.startDate ? new Date(worktime.startDate).toLocaleTimeString() : ''}
                                    </p>
                                </div>}
                            </div>
                        }
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
