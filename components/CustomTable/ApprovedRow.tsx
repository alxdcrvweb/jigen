import { observer } from 'mobx-react'
import { IAccount } from '../../models/models';
import { AdminRowProps } from '../../pages/admin';

const ApprovedRow = observer(({twitter, hasTokens, address, approvalStatus}: IAccount) => {
    return (
        <tr>
            <td>{twitter} </td>
            <td>{`${hasTokens}`} </td>
            <td>{address}</td>
            <td>{approvalStatus} </td>
        </tr>
    )
})

export default ApprovedRow

