import s from '../../../styles/rewards.module.scss';
import RewardsCard from './RewardsCard';
import { observer } from 'mobx-react';
import rolex01 from '../../../public/App/rewards/rolex01.png';
import rolex02 from '../../../public/App/rewards/rolex02.png';
import { IRewardsCard } from '../../../models/models';

const rewardsList: IRewardsCard[] = [
    {_id: '1', title: 'Physical Hoodie', locked: false, expressIn: '2D', image: rolex01, metalock: '4 weeks', requirement: ''},
    {_id: '2', title: 'Physical Hoodie', locked: true, expressIn: '1W', image: rolex02, metalock: '4 weeks', requirement: ''},
    {_id: '3', title: 'Physical Hoodie', locked: false, expressIn: '3D', image: rolex01, metalock: '4 weeks', requirement: ''},
]

interface RewardsGridProps {
}

export const RewardsGrid = observer(({}: RewardsGridProps) => {

    return (
        <div className={s.rewards__body}>
            {rewardsList.map(el => (
                <RewardsCard key={el._id} {...el} />
            ))}
        </div>
    )
});