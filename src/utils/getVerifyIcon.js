import { CircleCross, NotifyOkIcon, NotifyWarningIcon } from "../components/Icons"
import { VERIFY_STATUS } from "../consts/VERIFY_STATUS"

export const getVerifyIcon = (verifyStatus) => {
    switch (verifyStatus) {
        case VERIFY_STATUS.VERIFIED:
            return <NotifyOkIcon className="verify__success" />
        case VERIFY_STATUS.PROCESS:
            return <NotifyWarningIcon className="verify__process" />
        default:
            return <CircleCross className="verify__not" />
    }
}