import { observer } from 'mobx-react'


const MetalockIcon = observer(({}: React.ComponentPropsWithRef<'svg'>) => {

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1304_199)">
                <path
                    d="M15.625 7.5H15V5C15 2.24243 12.7576 0 10 0C7.24243 0 5 2.24243 5 5V7.5H4.375C3.34167 7.5 2.5 8.34076 2.5 9.375V18.125C2.5 19.1592 3.34167 20 4.375 20H15.625C16.6583 20 17.5 19.1592 17.5 18.125V9.375C17.5 8.34076 16.6583 7.5 15.625 7.5ZM6.66672 5C6.66672 3.16162 8.16162 1.66672 10 1.66672C11.8384 1.66672 13.3333 3.16162 13.3333 5V7.5H6.66672V5Z"
                    fill="inherit"/>
            </g>
        </svg>

    )
})


export default MetalockIcon

