import moment from 'moment-timezone';

export const getNormalDate = (date) => {
    return moment(date).local("ru").tz("Asia/Yekaterinburg").format('DD.MM.YYYY');
}