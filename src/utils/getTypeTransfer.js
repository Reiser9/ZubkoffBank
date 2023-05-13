import {HISTORY_STATUSES} from '../consts/HISTORY_STATUSES';

export const getTypeTransfer = (type) => {
    switch(type){
        case HISTORY_STATUSES.RECEIVE:
            return "Пополнение";
        case HISTORY_STATUSES.SEND:
            return "Перевод";
        case HISTORY_STATUSES.SUBSCRIBE:
            return "Подписка";
        case HISTORY_STATUSES.ATM:
            return "Пополнение с банкомата";
        default:
            return "Неизвестно";
    }
}