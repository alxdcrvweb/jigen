import { observer } from 'mobx-react'
import s from '../../styles/customForm.module.scss'
import cn from 'classnames';
import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface CheckboxProps {
    id: string
    name: string
    type?: HTMLInputTypeAttribute
    value: string
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = observer(<T extends string>({name, type = 'checkbox', value, id, checked, onChange}: CheckboxProps) => {

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }

    return (
        <label
            tabIndex={0}
            htmlFor={id}
            className={cn(s.checkbox, checked && s._active)}
        >
            <input
                type={type}
                name={name}
                checked={checked}
                value={value}
                id={id}
                onChange={changeHandler}
            />
            <span>{value}</span>
        </label>
    )
})


export default Checkbox

