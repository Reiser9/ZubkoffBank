import { REQUEST_STATUSES } from "../consts/REQUEST_STATUSES";

export const requestDataIsError = (data) => {
    return (
        data.status === REQUEST_STATUSES.NOT_SUCCESSFUL ||
        data.status === REQUEST_STATUSES.SITE_NOT_AVAILABLE ||
        data.status === 500 ||
        data.status === 403
    );
};
