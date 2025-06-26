import { observer } from 'mobx-react'
import Table from './Table';
import Row from './Row';

export interface ExampleRowProps {
    id: number
    result: string
    volume: string
    percent: string
    reward: string
}

const transactions: ExampleRowProps[] = [
    {id: 1, result: 'Germany', reward: '$500', percent: '60', volume: '1,500.42'},
    {id: 2, result: 'Germany', reward: '$1500', percent: '60', volume: '1,500.42'},
    {id: 3, result: 'Germany', reward: '$15000', percent: '60', volume: '1,500.42'},
    {id: 4, result: 'Germany', reward: '$100', percent: '60', volume: '1,500.42'},
]

const tableHead = [
    'result',
    'volume',
    '% from the total amount',
    'potential reward',
    '',
]


const TableExample = observer(({}: TableExampleProps) => {

    return (
        <>
            <Table<{}, ExampleRowProps>
                head={tableHead}
                items={transactions || []}
                TableRow={Row}
                props={{}}
            />
        </>
    )
})

interface TableExampleProps {

}

export default TableExample

