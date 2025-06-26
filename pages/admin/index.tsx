import { NextPage } from 'next';
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react';
import { AdminStore } from '../../stores/AdminStore';
import s from '../../styles/admin.module.scss'
import cn from 'classnames';
import { useEffect, useState } from 'react';
import Table from '../../components/CustomTable/Table';
import AdminRow from '../../components/CustomTable/AdminRow';
import { IAccount } from '../../models/models';
import { toast } from 'react-toastify';
import { WalletStore } from '../../stores/WalletStore';
import axios from 'axios';

export interface AdminRowProps {
    addressHandler: (address: string) => void
    addresses: string[]
}

const tableHead = [
    '',
    'twitter',
    'hasTokens',
    'address',
    'info',
    'approvalStatus',
]

const Admin: NextPage = observer(() => {
    const [addresses, setAddresses] = useState<string[]>([]);
    const {getApplications, applications, denyApplications, approveApplications, disabled, download} = useInjection(AdminStore)
    const {connected, connectWallet, login, walletConnected} = useInjection(WalletStore)


    const connectHandler = () => {
        walletConnected ? login() : connectWallet("fromClickHandler")
    }

    const clickHandler = (status: 'all' | 'pending' | 'approved' | 'denied') => {
        getApplications(status)
    }

    const addressHandler = (address: string) => {
        setAddresses(prev => {
            if (prev.includes(address)) {
                return prev.filter(cur => cur !== address)
            }
            return [...prev, address]
        })
    }

    const denyHandler = async () => {
        if (addresses.length === 0) return toast.error('Select some applications and try again')
        const res = await denyApplications(addresses)
        if (res) {
            await getApplications()
            setAddresses([])
        }
    }
    const approveHandler = async () => {
        if (addresses.length === 0) return toast.error('Select some applications and try again')
        const res = await approveApplications(addresses)
        if (res) {
            await getApplications()
            setAddresses([])
        }
    }

    useEffect(() => {
        connected && getApplications()
    }, [connected])

    return (
        <div className={s.admin}>
            <div className={cn(s.admin__container, '_container')}>
                <h1 className={'_title'}>Admin</h1>
                {!connected &&
                    <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={connectHandler}>
                        <span>
                            {walletConnected ? 'login' : 'connect wallet'}
                        </span>
                    </button>
                }
                <div className={s.admin__row}>
                    <div className={cn(s.admin__label, '_subtitle')}>Filters</div>
                    <div className={s.admin__btns}>
                        <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={() => clickHandler('all')}>
                            <span>All</span>
                        </button>
                        <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={() => clickHandler('pending')}>
                            <span>pending</span>
                        </button>
                        <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={() => clickHandler('approved')}>
                            <span>approved</span>
                        </button>
                        <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={() => clickHandler('denied')}>
                            <span>denied</span>
                        </button>
                    </div>
                </div>
                <div className={s.admin__row}>
                    <div className={cn(s.admin__label, '_subtitle')}>Actions</div>
                    <div className={s.admin__actions}>
                        <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={approveHandler}>
                            <span>approve</span>
                        </button>
                        <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={denyHandler}>
                            <span>deny</span>
                        </button>
                       {connected && <button className={cn(s.jigenListFirst__btn, '_btn')} disabled={disabled} onClick={download}>
                            <span>Download CSV</span>
                        </button>}
                    </div>
                    <div className="admin__table">
                        <Table<AdminRowProps, IAccount>
                            head={tableHead}
                            items={applications}
                            TableRow={AdminRow}
                            props={{addressHandler, addresses}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Admin

