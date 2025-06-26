import { observer } from 'mobx-react'
import { FC } from 'react'
import s from '../../styles/main.module.scss'
import cn from 'classnames'
// import man01 from '../../public/utilites/01.webp'
// import man02 from '../../public/utilites/02.webp'
// import man01 from '../../public/gifs/1.json'
import man01_replacement from '../../public/gifs/1_replacement.json'
// import man02 from '../../public/gifs/2.json'
import man02_replacement from '../../public/gifs/2_replacement.json'


import icon01 from '../../public/utilites/01.svg'
import icon02 from '../../public/utilites/02.svg'
import icon03 from '../../public/utilites/03.svg'
import icon04 from '../../public/utilites/04.svg'
import Image from 'next/image'
import UtilitiesItem from './UtilitiesItem'


const UtilitiesList = [
    {
        id: 1,
        title: 'METAVERSE',
        Text: () => <>Embracing the metaverse as a futuristic way to consolidate our digital presence. Several <span>events</span> will be organised to engage our community and build our
            brand positioning</>,
        image: man01_replacement,
        icon: icon01
    },
    {
        id: 2,
        title: 'COLLABORATIONS',
        Text: () => <>Long term partnership with established brands that share a similar vision for the <span>web3 future.</span> Building key alliances with emerging NFT projects to offer a
            wide range of opportunities to our holders</>,
        icon: icon02
    },
    {
        id: 3,
        title: 'COMMUNITY',
        Text: () => <>As a member of the Jigen family, be ready to have fun and be involved in engaging activities along the path, networking with experienced <span>NFT collectors and fashion leaders</span> </>,
        image: man02_replacement,
        icon: icon04
    },
    {
        id: 4,
        title: 'IRL',
        Text: () => <>Phygital experiences represent the core of our mission. Our background in the fashion and luxury sector is at the service of the community to create <span>high quality merchandising</span> with
            proof of authenticity</>,
        icon: icon03
    },
]


const Utilities: FC = observer(({}) => {
    return (
        <section className={s.utilities}>
            <div className={cn(s.utilities__container, '_container')}>
                <div className={s.utilities__box}>
                    <h2 className={cn(s.utilities__title, '_title', '_title_gradient')}>UTILITIES </h2>
                    <div className={s.utilities__grid}>
                        {UtilitiesList.map(el => <UtilitiesItem key={el.id} {...el} />)}
                    </div>
                </div>
            </div>
        </section>
    )
})

export default Utilities
