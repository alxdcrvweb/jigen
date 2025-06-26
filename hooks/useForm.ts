import { ChangeEvent, FormEvent, useState } from 'react';

export const useForm = <T>(defaultState: T) => {
    const [state, setState] = useState<T>(defaultState);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(prev => {
            const value = prev[e.target.name as keyof T]
            // @ts-ignore
            if (value === e.target.value) return prev
            if (e.target.type === 'checkbox' && value instanceof Array) {
                return {...prev, [e.target.name]: (value.includes(e.target.value) ? value.filter(el => el !== e.target.value) : value.concat(e.target.value))}
            }
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('e', e)
    }

    return {submitHandler, onChange, state}
}