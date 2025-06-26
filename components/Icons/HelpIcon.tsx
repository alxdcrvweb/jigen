import { observer } from 'mobx-react'

const HelpIcon = observer(({}: React.ComponentPropsWithRef<'svg'>) => {

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1048_4389)">
                <path
                    d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z"
                    stroke="inherit" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14.166H10.0089" stroke="inherit" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M7.5752 7.4995C7.77112 6.94255 8.15782 6.47292 8.66682 6.17378C9.17583 5.87463 9.77427 5.76528 10.3562 5.86509C10.9381 5.9649 11.4659 6.26743 11.8461 6.7191C12.2263 7.17077 12.4344 7.74243 12.4335 8.33283C12.4335 9.9995 9.93353 10.8328 9.93353 10.8328"
                    stroke="inherit" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>


    )
})


export default HelpIcon

