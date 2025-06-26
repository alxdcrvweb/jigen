import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Collection from '../components/Collection'
import Faq from '../components/Faq'
import FullpageSection from '../components/FullpageSection'
import HypebeastSection from '../components/Hypebeast'
import JIG from '../components/JIG'
import LineSection from '../components/LineSection'
import OurTeam from '../components/OurTeam'
import Partners from '../components/Partners'
import Tokenomics from '../components/Tokenomics'
import Utilities from '../components/Utilities'
import WhatsNext from '../components/WhatsNext'
import s from '../styles/main.module.scss'
import LandingLayout from '../components/LandingLayout';


const Home: NextPage = observer(({}) => {
    return (
        <LandingLayout>
            <div className={s.main}>
                <FullpageSection/>
                <HypebeastSection/>
                <Utilities/>
                <JIG/>
                <LineSection/>
                <Collection/>
                <Tokenomics/>
                <Partners/>
                <WhatsNext/>
                <Faq/>
                <OurTeam/>
            </div>
        </LandingLayout>
    )
})

export default Home
