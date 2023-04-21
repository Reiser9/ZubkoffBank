import moment from 'moment-timezone';

export const getNormalDate = (date, format = 'DD.MM.YYYY') => {
    if(!date){
        return;
    }

    return moment(date).local("ru").tz("Asia/Yekaterinburg").format(format);
}