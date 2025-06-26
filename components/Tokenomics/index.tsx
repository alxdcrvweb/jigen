import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';
import TokenomicsLabel from './TokenomicsLabel';
import roulette from '../../public/tokenomics/roulette.webp'
import Image from 'next/image'

const tokenomicsList = [
    {id: 1, text: 'Team', color: '#EE5349'},
    {id: 2, text: 'Marketing & Development', color: '#FFA149'},
    {id: 3, text: 'Public Sale', color: '#F4CD3F'},
    {id: 4, text: 'Seed Sale', color: '#FCFF52'},
    {id: 5, text: 'Staking & Rewards', color: '#B9F835'},
    {id: 6, text: 'Private Sale', color: '#52FFCB'},
    {id: 7, text: 'Treasury', color: '#52E0FF'},
    {id: 8, text: 'Liquidity', color: '#B352FF'},
    {id: 9, text: 'Advisors', color: '#FC52FF'},
]


const Tokenomics: FC = observer(({}) => {

    return (
        <section className={s.tokenomics}>
            <div className={cn(s.tokenomics__container, '_container')}>
                <div className={s.tokenomics__box}>
                    <h2 className={cn(s.tokenomics__title, '_title')}>Tokenomics</h2>
                    <div className={s.tokenomics__subtitle}>Total supply: 100,000,000</div>
                    <div className={s.tokenomics__labels}>
                        {tokenomicsList.map(el => <TokenomicsLabel key={el.id} {...el} />)}
                    </div>
                    <div className={s.tokenomics__roulette}>
                        <Image src={roulette} alt={'roulette image'} layout="responsive"/>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default Tokenomics
