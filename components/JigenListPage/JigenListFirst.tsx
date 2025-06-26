import { observer } from 'mobx-react';
import cn from 'classnames';
import s from '../../styles/jigenlist.module.scss';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import { FC } from 'react';


interface JigenListFirstProps {
    clickHandler: () => void
    text: string
    btnText: string
}

export const JigenListFirst: FC<JigenListFirstProps> = observer(({text, btnText, clickHandler}) => {

    return (
        <div className={cn(s.jigenListMain__first, s.jigenListFirst)}>
            <div className={s.jigenListFirst__logo}>
                <Image src={logo} alt="logo" layout="responsive"/>
            </div>
            <div className={s.jigenListFirst__text}>
                {text}
            </div>
            <button className={cn(s.jigenListFirst__btn, '_btn')} onClick={clickHandler}>
                <span>{btnText}</span>
            </button>
        </div>
    )
});

