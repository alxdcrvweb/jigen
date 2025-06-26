import { observer } from 'mobx-react'
import { useForm } from '../../hooks/useForm';
import Checkbox from './Checkbox';
import Select from './Select';

enum SelectItemsEnum {
    'Germany',
    'France',
    'England',
}

enum SelectItemsEnum_2 {
    'Germany_2',
    'France_2',
    'England_2',
}

type SelectItemsType = keyof typeof SelectItemsEnum;
type SelectItemsType_2 = keyof typeof SelectItemsEnum_2;

const SelectList: Array<SelectItemsType> = [
    'Germany',
    'France',
    'England',
]

const SelectList_2: Array<SelectItemsType_2> = [
    'Germany_2',
    'France_2',
    'England_2',
]

interface IState {
    stake: Array<string>,
    country: SelectItemsType
    country_test: SelectItemsType_2
    radio: string
}

export type SelectTypes = Exclude<keyof IState, 'stake'> | ''
export type SelectTypes_2 = Exclude<keyof IState, 'stake'> | ''

const FormExample = observer(({}: FormExampleProps) => {

    const {state, submitHandler, onChange} = useForm<IState>({
        stake: [],
        country: 'England',
        country_test: 'England_2',
        radio: '1',
    })

    return (
        <form onSubmit={submitHandler} style={{display: 'flex', columnGap: '8px', color: 'white'}}>
            <Checkbox checked={state.stake.includes('5')} value={'5'} onChange={onChange} name="stake" id="stake_checkbox_5"/>
            <Checkbox checked={state.stake.includes('10')} value={'10'} onChange={onChange} name="stake" id="stake_checkbox_10"/>
            <Select<SelectItemsType, SelectTypes>
                options={SelectList}
                name="country"
                value={state.country}
                onChange={onChange}
            />
            <Select<SelectItemsType_2, SelectTypes_2>
                options={SelectList_2}
                name="country_test"
                value={state.country_test}
                onChange={onChange}
            />

            <Checkbox checked={state.radio === '1'} value={'1'} onChange={onChange} name="radio" type="radio" id="radio_1"/>
            <Checkbox checked={state.radio === '2'} value={'2'} onChange={onChange} name="radio" type="radio" id="radio_2"/>

            <button type="submit">submit</button>
        </form>
    )
})

interface FormExampleProps {

}

export default FormExample

