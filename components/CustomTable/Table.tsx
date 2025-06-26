import { observer } from 'mobx-react';
import { MinTableItem } from '../../models/tables';
import s from '../../styles/table.module.scss'

interface TableProps<T, U> {
    items: U[]
    head: string[]
    TableRow: (props: T & U) => JSX.Element
    props: T
}

const Table = observer(<U extends Object, T extends MinTableItem>({head, items, TableRow, props}: TableProps<U, T>) => {
    return (
        <div className={s.container}>
            <table className={s.table} cellSpacing="0" cellPadding={10}>
                <thead>
                <tr>
                    {head?.map((el, index) => {
                        return <th key={el + index} scope="col">{el}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {items.length > 0 ? items.map(item => <TableRow key={item._id || item.id} {...item} {...props}/>) : (
                    <tr>
                        {}
                        <td colSpan={head.length} align={'center'}>Data is not available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
})

export default Table
