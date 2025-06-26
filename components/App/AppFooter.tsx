import s from '../../styles/appLayout.module.scss';
import { observer } from 'mobx-react';
import cn from 'classnames';
import Link from 'next/link';

export const AppFooter = observer(() => {

    const footerList = [
        {id: 1, text: 'Privacy Policy', link: '/privacy'},
        {id: 2, text: 'Terms of Service', link: '/terms'},
    ]

    return (
        <footer className={cn(s.appLayoutWrapper__footer, s.appFooter)}>
            <div className={cn(s.appFooter__actions, '_appContainer')}>
                {footerList.map(el => (
                    <Link
                        key={el.id}
                        href={el.link}
                        className={s.appFooter__link}
                    >{el.text}</Link>
                ))}
            </div>
        </footer>
    )
})