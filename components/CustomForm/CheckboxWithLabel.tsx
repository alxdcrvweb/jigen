import { observer } from 'mobx-react'
import s from '../../styles/customForm.module.scss'
import cn from 'classnames';
import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface CheckboxWithLabelProps {
    id: string
    name: string
    type?: HTMLInputTypeAttribute
    label: string
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckboxWithLabel = observer(<T extends string>({name, type = 'checkbox', label, id, checked, onChange}: CheckboxWithLabelProps) => {

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }

    return (
        <label
            tabIndex={0}
            htmlFor={id}
            className={cn(s.checkboxWithLabel, checked && s._active)}
        >
            <input
                type={type}
                name={name}
                checked={checked}
                id={id}
                onChange={changeHandler}
            />
            <span className={s.checkboxWithLabel__checkbox}></span>
            <span className={s.checkboxWithLabel__label}>{label}</span>
        </label>
    )
})


export default CheckboxWithLabel

