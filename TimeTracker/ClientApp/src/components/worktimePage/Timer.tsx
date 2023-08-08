import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WorktimeRecord, WorktimeInput } from '../../behavior/worktime/types';
import { Form, Formik } from 'formik';
import { updateWorktimeFinishDate, worktimeCreation } from '../../behavior/worktime/actions';
import { UserInfo } from '../../behavior/profile/types';
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
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [buttonText, setButtonText] = useState('Start');
    const [showSessionStartMessage, setShowSessionStartMessage] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [startDateAsTimestamp, setStartDateAsTimestamp] = useState(false);
    const [startDate, setStartDate] = useState<string | null>(null);

    useEffect(() => {
        setStartDate(worktime?.startDate || null);
    }, [worktime]);

    useEffect(() => {
        console.log(worktime);
        const now = Date.now();
        if (worktime) {
            const startDateAsTimestamp = new Date(startDate!).getTime();
            if (startDateAsTimestamp < now) {
                console.log(startDateAsTimestamp);
                continueTimer();
            }
        }
    }, [worktime]);

    
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


    const continueTimer = () => {
        const startDateFromLocalStorage = startDate;
    
        if (startDateFromLocalStorage) {
            const start = new Date(startDateFromLocalStorage).getTime();
            const now = Date.now();
            const timeDifference = now - start;
            const formattedTime = formatTime(timeDifference);
            console.log(startDate);
            const [hours, minutes, seconds] = formattedTime.split(':').map(Number);

            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);

            setIsRunning(true);

            setShowSessionStartMessage(true);

            return timeDifference;

        } else {
            return 0;
        }
    };
    
    const handleBeforeUnload = () => {
        if (isRunning && timer) {
            clearInterval(timer);
            const remainingTime = seconds + minutes * 60 + hours * 3600;
            localStorage.setItem(timerKey, JSON.stringify({isRunning, startTime: Date.now(), remainingTime}));
        }
    };

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
            setButtonText('Start');
            dispatch(updateWorktimeFinishDate(user.id));
            setStartDate(null);
            setIsStopped(true);
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setShowSessionStartMessage(false);
            setIsStopped(true);

        } else {
            setIsRunning(true);
            initialValues.startDate = new Date().toISOString();
            initialValues.userId = user.id;
            initialValues.lastEditorId = user.id;
            const buttonText = 'Stop' ?? '';
            setButtonText(buttonText);
            dispatch(worktimeCreation(values));

            setShowSessionStartMessage(true);
            setIsStopped(false);

        }
    };
    
     useEffect(() => {
         const buttonText = isRunning ? 'Stop' : 'Start';
         setButtonText(buttonText);
     }, [isRunning]);


    useEffect(() => {
        localStorage.setItem(timerKey, JSON.stringify({isRunning, startTime: Date.now()}));
    }, [isRunning]);


   /* const button = () => {
        console.log(worktime);
    };*/

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
            
            {showSessionStartMessage && ((initialValues.startDate) || (worktime?.startDate)) && (
                <div className='session-start-message'>
                    <div className={'alert alert-success text-white rounded d-flex justify-content-between align-items-center'}>
                        <p className="m-0">
                            Session started
                            at {initialValues.startDate
                            ? new Date(initialValues.startDate).toLocaleTimeString()
                            : worktime?.startDate ? new Date(worktime.startDate).toLocaleTimeString() : ''}
                        </p>
                    </div>
                </div>
            )}
        </div>
);
};

