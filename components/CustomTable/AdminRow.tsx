import { observer } from 'mobx-react'
import { IAccount } from '../../models/models';
import { AdminRowProps } from '../../pages/admin';

const AdminRow = observer(({twitter, hasTokens, address, approvalStatus, addressHandler, addresses, additionalInfo}: AdminRowProps & IAccount) => {

    return (
        <tr>
            <td>
                <input type="checkbox" disabled={approvalStatus !== 'PENDING'} checked={addresses.includes(address)} onChange={() => addressHandler(address)}/>
            </td>
            <td>{twitter} </td>
            <td>{`${hasTokens}`} </td>
            <td>{address}</td>
            <td style={{whiteSpace: 'pre-wrap'}}>{additionalInfo}</td>
            <td>{approvalStatus} </td>
        </tr>
    )
})

export default AdminRow

