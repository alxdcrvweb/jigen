import { observer } from 'mobx-react'
import s from '../../styles/jigenlist.module.scss'
import cn from 'classnames';

const JigenListFooter = observer(({}: JigenListFooterProps) => {

    return (
        <footer className={s.jigenListFooter}>
            <div className={cn(s.jigenListFooter__container, '_container')}>
                <div className={s.jigenListFooter__box}>
                    <a href="#" className={s.jigenListFooter__link}>Privacy Policy</a>
                    <a href="#" className={s.jigenListFooter__link}>Terms of Service</a>
                </div>
            </div>
        </footer>
    )
})

interface JigenListFooterProps {

}

export default JigenListFooter

