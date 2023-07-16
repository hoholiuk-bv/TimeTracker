﻿import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { requestEmploymentTypeList, requestUserList } from '../../behavior/users/actions';

import { DemoWorktime } from './DemoWorktime';

export const ListPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.profile.userInfo);

    
    return (
        <>
            <h1 className="mb-4"></h1>
            <DemoWorktime users={users} />
        </>
    );
};
