import { observer } from 'mobx-react'
import { ExampleRowProps } from './TableExample';


const Row = observer(({reward, result, volume, percent, id}: ExampleRowProps) => {
    return (
        <tr>
            <td>{result} </td>
            <td>{volume} </td>
            <td align={'center'}>{percent} </td>
            <td align={'center'}>{reward} </td>
            <td align={'right'}>
                <button style={{color: 'white', border: '1px solid red', padding: '5px 10px'}} disabled={id % 2 === 0}>
                    Add
                </button>
            </td>
        </tr>
    )
})

export default Row

