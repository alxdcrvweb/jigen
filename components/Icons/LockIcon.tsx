import { observer } from 'mobx-react'


const LockIcon = observer(({}: React.ComponentPropsWithRef<'svg'>) => {

    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.9375 5.25H10.5V3.5C10.5 1.5697 8.9303 0 7 0C5.0697 0 3.5 1.5697 3.5 3.5V5.25H3.0625C2.33917 5.25 1.75 5.83853 1.75 6.5625V12.6875C1.75 13.4115 2.33917 14 3.0625 14H10.9375C11.6608 14 12.25 13.4115 12.25 12.6875V6.5625C12.25 5.83853 11.6608 5.25 10.9375 5.25ZM4.6667 3.5C4.6667 2.21313 5.71313 1.1667 7 1.1667C8.28687 1.1667 9.3333 2.21313 9.3333 3.5V5.25H4.6667V3.5Z"
                fill="inherit"/>
        </svg>
    )
})


export default LockIcon

