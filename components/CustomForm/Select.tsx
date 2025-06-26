import { observer } from 'mobx-react'
import s from '../../styles/customForm.module.scss'
import cn from 'classnames';
import React, { ChangeEvent, HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';

interface SelectProps<T, K> {
    name: K
    type?: HTMLInputTypeAttribute
    value: string
    options: Array<T>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Select = observer(<T extends string, K extends string>({name, value, type = 'radio', onChange, options}: SelectProps<T, K>) => {

    const selectRef = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false);

    const toggleHandler = () => setOpen(prev => !prev)
    const closeHandler = () => setOpen(false)

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        closeHandler()
    }

    const handleClickOutside = (e: MouseEvent) => {
        selectRef?.current && e.target && !selectRef.current.contains(e.target as Node) && closeHandler()
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef]);

    return (
        <div className={s.select} ref={selectRef}>
            <div className={cn(s.select__current, open && s._active)} onClick={toggleHandler}>{value}</div>
            <div className={cn(s.select__dropdown, open && s.select__dropdown_open)}>
                {options.map(el => (
                    <label
                        tabIndex={0}
                        key={el}
                        htmlFor={el}
                        className={cn(s.select__label, value === el && s._active)}
                    >
                        <input
                            type={type}
                            name={name}
                            checked={value === el}
                            value={el}
                            id={el}
                            onChange={changeHandler}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
        </div>
    )
})


export default Select

