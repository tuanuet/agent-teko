import moment from 'moment'
import {
    DEFAULT,
    IMAGE,
    FILE,
    VIDEO,
    AUDIO,
} from './constants/MessageTypes'
export const now = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

export const formatDatetime = datetime => {
    const now = moment()
    const value = moment(datetime)
    return capitalizeFirstLetter(value.calendar())
}

export const formatLatestMessage = message => {
    const { content, messageType, messageFrom, senderName } = message
    const subject = messageFrom === 0 ? 'Bạn' : senderName
    if (messageType === IMAGE) return `${subject} đã gửi một ảnh`
    else if (messageType === VIDEO) return `${subject} đã gửi một video`
    else if (messageType === AUDIO) return `${subject} đã gửi một audio`
    else if (messageType === FILE) return `${subject} đã gửi một tệp`
    else return `${messageFrom === 0 ? `Bạn: ` : ``}${content}`
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
