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
    userId: localStorage.getItem('userId') || null,
    startDate: localStorage.getItem('startDate') || null,
    finishDate: null,
    lastEditorId: localStorage.getItem('editorId') || null,
    isAutoCreated: false,
};

export const Timer = ({user}: Props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [buttonText, setButtonText] = useState('Start');
    const [showSessionStartMessage, setShowSessionStartMessage] = useState(false);
    const [isSessionEndMessageVisible, setSessionEndMessageVisible] = useState(false);


    const timerKey = 'timerData';
    const storedTimerData = localStorage.getItem(timerKey);

    let timer: NodeJS.Timeout | null = null;
    const dispatch = useDispatch();

    const formatTime = (milliseconds: number) => {
        const seconds = Math.floor(milliseconds / 1000) % 60;
        const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
        const hours = Math.floor(milliseconds / 1000 / 60 / 60);

        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };


    const clearTimerValues = () => {
        const startDateFromLocalStorage = localStorage.getItem('startDate');

        if (startDateFromLocalStorage) {
            const start = new Date(startDateFromLocalStorage).getTime();
            const now = Date.now();
            const timeDifference = now - start;
            const formattedTime = formatTime(timeDifference);

            const [hours, minutes, seconds] = formattedTime.split(':').map(Number);

            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);

            return timeDifference;

        } else {
            return 0;
        }
    };

    useEffect(() => {
        clearTimerValues();
    }, [hours, minutes, seconds]);


    const handleBeforeUnload = () => {
        if (isRunning && timer) {
            clearInterval(timer);
            const remainingTime = seconds + minutes * 60 + hours * 3600;
            localStorage.setItem(timerKey, JSON.stringify({isRunning, startTime: Date.now(), remainingTime}));
        }
    };

    useEffect(() => {
        if (storedTimerData) {
            const {isRunning: storedIsRunning, startTime: storedStartTime, remainingTime} = JSON.parse(storedTimerData);
            const now = Date.now();
            const elapsedTime = Math.floor((now - storedStartTime) / 1000);
            const totalSeconds = remainingTime - elapsedTime;

            if (storedIsRunning && elapsedTime < remainingTime) {
                const remainingHours = Math.floor(totalSeconds / 3600);
                const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
                const remainingSecondsMod = totalSeconds % 60;

                setSeconds(remainingSecondsMod);
                setMinutes(remainingMinutes);
                setHours(remainingHours);

                if (elapsedTime < remainingTime) {
                    setIsRunning(true);
                }
            }
        }
    }, []);
    

    useEffect(() => {
        localStorage.setItem('seconds', seconds.toString());
        localStorage.setItem('minutes', minutes.toString());
    }, [seconds, minutes]);

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
            clearInterval(timer!);
            setIsRunning(false);
            initialValues.finishDate = new Date().toISOString();
            setButtonText('Start');
            dispatch(worktimeCreation(values));
            localStorage.removeItem('startDate');
            localStorage.removeItem('seconds');
            localStorage.removeItem('minutes');
            localStorage.removeItem('hours');
            localStorage.removeItem('buttonText');
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setShowSessionStartMessage(false);
            setSessionEndMessageVisible(true);
        } else {
            const start = new Date().toISOString();
            const userId = user.id;
            const editorId = user.id;
            const button = 'Stop';
            localStorage.setItem('startDate', start);
            localStorage.setItem('userId', userId);
            localStorage.setItem('editorId', editorId);
            localStorage.setItem('buttonText', button);
            setIsRunning(true);
            initialValues.startDate = localStorage.getItem('startDate');
            initialValues.userId = user.id;
            initialValues.lastEditorId = user.id;
            const buttonText = localStorage.getItem('buttonText') ?? '';
            setButtonText(buttonText);

            setShowSessionStartMessage(true);
            setSessionEndMessageVisible(false);


        }
    };

    const closeSessionEndMessage = () => {
        setSessionEndMessageVisible(false);
    };
    const handleStopButtonClick = () => {
        closeSessionEndMessage();
        setTimeout(() => setSessionEndMessageVisible(false), 2000);
    };
    const closeSessionStartMessage = () => {
        setShowSessionStartMessage(false);
    };

    useEffect(() => {
        const buttonText = localStorage.getItem('buttonText') || 'Start';
        setButtonText(buttonText);
    }, []);


    useEffect(() => {
        localStorage.setItem(timerKey, JSON.stringify({isRunning, startTime: Date.now()}));
    }, [isRunning]);
    

    return (
        <div className="container">
            <Formik onSubmit={toggleTimer} initialValues={initialValues}>
                <Form>
                    <h1>Worktime</h1>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6 text-center border rounded p-4">
                            <h1 className="mb-4">
                                {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
                            </h1>
                            <button className="btn btn-primary" type="submit">
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
            {showSessionStartMessage && (
                <div className="position-fixed top-50 start-50 translate-middle col-md-2 text-center row justify-content-center mt-5" style={{ marginLeft: '6rem' }}>
                    <div className="alert alert-success text-white rounded d-flex justify-content-between align-items-center" style={{ background: 'rgba(46, 139, 87, 0.7)', padding: '0.2rem' }}>
                        <p className="m-0" style={{ padding: '0.25rem' }}>
                            Session started at {initialValues.startDate ? new Date(initialValues.startDate).toLocaleTimeString() : ''}
                        </p>
                        <button type="button" className="btn-close text-white" onClick={closeSessionStartMessage} style={{ width: '0.75rem', height: '0.75rem', fontSize: '0.75rem' }}></button>
                    </div>
                </div>
            )}
            {isSessionEndMessageVisible && (
                <div
                    className="position-fixed top-50 start-50 translate-middle col-md-2 text-center row justify-content-center mt-5"
                    style={{ marginLeft: '6rem', opacity: 1, transition: 'opacity 0.5s ease' }}
                >
                    <div className="alert alert-danger text-white rounded d-flex justify-content-between align-items-center" style={{ background: 'rgba(255, 0, 0, 0.7)', padding: '0.2rem' }}>
                        <p className="m-0" style={{ padding: '0.25rem' }}>
                            Session ended at {new Date().toLocaleTimeString()}
                        </p>
                        <button type="button" className="btn-close text-white" onClick={handleStopButtonClick} style={{ width: '0.75rem', height: '0.75rem', fontSize: '0.75rem' }}></button>
                    </div>
                </div>
            )}
        </div>
    );
};

