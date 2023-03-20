import {NotifyWarningIcon, NotifyOkIcon, NotifyErrorIcon, NotifyInfoIcon} from '../components/Icons';

export const NOTIFY = {
    ERROR: {
        TYPE: "notify-error",
        ICON: <NotifyErrorIcon />
    },
    WARN: {
        TYPE: "notify-warning",
        ICON: <NotifyWarningIcon />
    },
    INFO: {
        TYPE: "notify-info",
        ICON: <NotifyInfoIcon />
    },
    SUCCESS: {
        TYPE: "notify-ok",
        ICON: <NotifyOkIcon />
    }
};