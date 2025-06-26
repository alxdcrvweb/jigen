import { observer } from 'mobx-react'


const ProfileIcon = observer(({}: React.ComponentPropsWithRef<'svg'>) => {

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1304_212)">
                <path
                    d="M10.6945 8.95731C13.0657 8.57292 14.6763 6.33906 14.2919 3.96786C13.9075 1.59665 11.6737 -0.013984 9.30248 0.370406C6.93128 0.754796 5.32064 2.98865 5.70503 5.35986C6.08942 7.73106 8.32328 9.3417 10.6945 8.95731Z"
                    fill="inherit"/>
                <path
                    d="M0.493652 15.0313C0.493652 17.6 2.58116 19.6875 5.14991 19.6875H14.8499C17.4187 19.6875 19.5062 17.6 19.5062 15.0313C19.5062 12.4625 17.4187 10.375 14.8499 10.375H5.14991C2.58116 10.375 0.493652 12.4625 0.493652 15.0313Z"
                    fill="inherit"/>
            </g>
        </svg>

    )
})


export default ProfileIcon

