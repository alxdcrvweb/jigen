import { observer } from 'mobx-react'
import s from '../../styles/jigenlist.module.scss'
import JigenListHeader from './JigenListHeader';
import { FC } from 'react';
import JigenListFooter from './JigenListFooter';

interface JigenListLayoutProps {
}


const JigenListLayout: FC<JigenListLayoutProps> = observer(({children}) => {

    return (
        <div className={s.jigenList}>
            <JigenListHeader/>
            {children}
            <JigenListFooter/>
        </div>
    )
})


export default JigenListLayout

