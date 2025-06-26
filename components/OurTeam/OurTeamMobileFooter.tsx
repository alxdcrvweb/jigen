import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC, MutableRefObject } from 'react';
import s from '../../styles/main.module.scss';
// Direct React component imports
import arrow from '../../public/icons/arrow-down.svg'
import Image from 'next/image'

interface OurTeamMobileFooterProps {
    navigationPrevRef: MutableRefObject<null>
    navigationNextRef: MutableRefObject<null>

}


const OurTeamMobileFooter: FC<OurTeamMobileFooterProps> = observer(({navigationPrevRef, navigationNextRef}) => {

    return (
        <div className={s.ourTeamMobile__footer}>
            <div className={cn(
                s.ourTeamMobile__nav,
                s.ourTeamMobile__nav_prev,
                '_iconbtn'
            )}
                 ref={navigationPrevRef}
            >
                <Image src={arrow} alt={'arrow prev'} width={24} height={24}/>
            </div>
            <div className={cn(s.ourTeamMobile__fraction, 'ourTeamFraction')}>
            </div>
            <div className={cn(
                s.ourTeamMobile__nav,
                s.ourTeamMobile__nav_next,
                '_iconbtn',
            )}
                 ref={navigationNextRef}
            >
                <Image src={arrow} alt={'arrow prev'} width={24} height={24}/>
            </div>
        </div>
    )
})

export default OurTeamMobileFooter
