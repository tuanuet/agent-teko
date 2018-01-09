import moment from 'moment'
import emos from 'emoji-datasource-messenger'
import GraphemeSplitter from 'grapheme-splitter'
import {
    DEFAULT,
    IMAGE,
    FILE,
    VIDEO,
    AUDIO,
    INFO
} from './constants/MessageTypes'

let emojiArray = []
emos.forEach(emo => {
    if (emo.texts) emojiArray = [...emojiArray, ...emo.texts]
})

export const isEmoji = word => {
    return word.match(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) || emojiArray.includes(word)
}

export const findEmoji = word => {
    if (emojiArray.includes(word)) return [emos.find(emo => {
        const { text, texts } = emo
        if (texts && texts.includes(word)) return true
        return false
    })]

    const splitter = new GraphemeSplitter()

    return splitter.splitGraphemes(word).map(value => {
        return emos.find(emo => {
            const { unified } = emo
            const codePoints = unified.split('-').map(u => `0x${u}`)
            const emoji = String.fromCodePoint(...codePoints)
            return emoji === value
        })
    })
}

export const now = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

export const formatSeen = datetime => {
    return lowerCaseFirstLetter(moment(datetime).calendar(null, {
        sameDay: 'HH:mm'
    }))
}

export const formatDatetime = datetime => {
    const value = moment(datetime)
    return capitalizeFirstLetter(value.calendar())
}

export const numberWithCommas = x => {
    return parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatLatestMessage = message => {
    const { content, messageType, messageFrom, senderName } = message
    const subject = messageFrom === 0 ? 'Bạn' : senderName
    if (messageType === IMAGE) return `${subject} đã gửi một ảnh`
    else if (messageType === VIDEO) return `${subject} đã gửi một video`
    else if (messageType === AUDIO) return `${subject} đã gửi một audio`
    else if (messageType === FILE) return `${subject} đã gửi một tệp`
    else if (messageType === INFO) return `${subject} đánh dấu đã đọc`
    else return `${messageFrom === 0 ? `Bạn: ` : ``}${content}`
}

const lowerCaseFirstLetter = string => {
    return string.charAt(0).toLowerCase() + string.slice(1)
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
