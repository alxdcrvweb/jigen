import { observer } from 'mobx-react'
import cn from 'classnames';
import s from '../../styles/jigenlist.module.scss';
import Image from 'next/image';
import send from '../../public/icons/send.svg';
import arrow from '../../public/icons/arrow-down.svg';
import { useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../../stores/WalletStore';
import { UserStore } from '../../stores/UserStore';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { isServer } from '../../utils/utilities';
import { ISession } from '../../models/models';

const max = 300


const JigenListFour = observer(({goToStep}: JigenListFourProps) => {

    const [step, setStep] = useState(1);
    const [value, setValue] = useState('');
    const [btnValue, setBtnValue] = useState<'' | 'yes' | 'no'>('');
    const {sign, walletConnected, web3Modal} = useInjection(WalletStore)
    const {appealUser} = useInjection(UserStore)
    const {data, status}: ISession = useSession()

    const holdingHandler = (value: '' | 'yes' | 'no') => {
        setBtnValue(value)
        setStep(3)
    }

    const sendHandler = () => {
        if (value.trim().length === 0) return toast.error('Please, enter in the field!')
        setStep(2)
    }

    const signHandler = async () => {
        const username = data?.twitter?.twitterHandle ? data?.twitter?.twitterHandle :  data?.user?.name
        console.log(data)
        if (!username || !value) return
        // const res = await sign()
        // if (!res) toast.error('Something get wrong. Try again later.')
        const redirect = await appealUser(username, value)
        redirect && goToStep(4)
    }

    const submitHandler = () => {
        goToStep(4)
    }

    useEffect(() => {
        if (!Boolean(web3Modal?.cachedProvider) && !walletConnected) goToStep(1)
        if (status !== 'loading' && !data?.user?.name) goToStep(2)
    }, [status])

    return (
        <div className={cn(s._box, s.jigenListFour)}>
                <span className={s.jigenListFour__step}>
                {step < 3 ? step : 2} / 2
            </span>

            {step === 1 && <>
                <div className={cn(s.jigenListFour__title, '_subtitle')}>
                    Anything we should know about you?
                </div>
                <div className={s.jigenListFour__form}>
                <textarea
                    className={s.jigenListFour__textarea}
                    maxLength={max}
                    placeholder="Start typing here..."
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                    <div className={s.jigenListFour__footer}>
                        <div className={s.jigenListFour__count}>
                            <b>{value.length}/{max}</b>
                        </div>
                        <button className={s.jigenListFour__send} onClick={sendHandler}>
                            Send
                            <Image src={send} alt="send icon" width={16} height={16}/>
                        </button>
                    </div>
                </div>
            </>
            }

            {step === 2 && (
                <>
                    <div className={cn(s.jigenListFour__title, '_subtitle')}>
                        are you holding 10k $Jig tokens?
                    </div>
                    <div className={s.jigenListFour__btns}>
                        <button className={cn(s.jigenListFour__btn, '_btn')} onClick={() => holdingHandler('yes')}>Yes</button>
                        <button className={cn(s.jigenListFour__btn, '_btn')} onClick={() => holdingHandler('no')}>No</button>
                    </div>
                </>
            )}
            {step === 3 && (
                <>
                    {/*{btnValue === 'yes' && (*/}
                    {/*    <>*/}
                    {/*        <div className={cn(s.jigenListFour__title, '_subtitle')}>*/}
                    {/*            verify your wallet*/}
                    {/*        </div>*/}
                    {/*        <div className={s.jigenListFour__btns}>*/}
                    {/*            <button className={cn(s.jigenListFour__btn, '_btn')} onClick={signHandler}>*/}
                    {/*                <span>Sign</span>*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*)}*/}
                    {/*{btnValue === 'no' && (*/}
                    {/*    <div className={s.jigenListFour__btns}>*/}
                    {/*        <button className={cn(s.jigenListFour__btn, '_btn')} onClick={signHandler}>*/}
                    {/*            <span>Submit</span>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div className={s.jigenListFour__btns}>
                        <button className={cn(s.jigenListFour__btn, '_btn')} onClick={signHandler}>
                            <span>Submit</span>
                        </button>
                    </div>
                    <button className={cn(s.jigenListFour__back, '_smallbtn _smallbtn_icon')} onClick={() => setStep(2)}>
                        <Image src={arrow} alt="arrow icon" width={24} height={24}/>
                        Back
                    </button>
                </>
            )
            }
        </div>
    )
})

interface JigenListFourProps {
    goToStep: (step: number) => void
}

export default JigenListFour

