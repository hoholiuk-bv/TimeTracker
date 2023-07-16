import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';

import { ListPage } from './ListPage';

export const WorktimePage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.profile.userInfo);
    
    
    
    return (
        <>
            <h1 className="mb-4"></h1>
            <ListPage users={users}/>
        </>
    );
};
