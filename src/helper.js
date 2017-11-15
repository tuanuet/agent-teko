import moment from 'moment'

export const now = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

export const formatDatetime = datetime => {
    const now = moment()
    const value = moment(datetime)
    return value.calendar()
}
