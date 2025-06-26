import { NextPage } from 'next';
import { observer } from 'mobx-react'
import s from '../styles/rewards.module.scss'
import AppLayout from '../components/App/AppLayout';
import cn from 'classnames';
import { RewardsGrid } from '../components/App/Rewards/RewardsGrid';


const Rewards: NextPage = observer(({}) => {

    return (
        <AppLayout>
            <main className={cn(s.rewards, '_appContainer')}>
                <div className={s.rewards__content}>
                    <div className={s.rewards__header}>
                        <h1 className={cn(s.rewards__title, '_appTitle')}>Rewards</h1>
                        <div className={cn(s.rewards__coming, '_text')}>
                            <b>More rewards coming!</b>
                            <span> Make sure to keep your hypebeast <br/>metalocked not to miss on any opportunity.</span>
                        </div>
                    </div>
                    <div className={s.rewards__main}>
                        <RewardsGrid/>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
})

export default Rewards

