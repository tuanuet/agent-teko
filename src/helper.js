import moment from 'moment'

export const now = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

export const formatDatetime = datetime => {
    const now = moment()
    const value = moment(datetime)
    return capitalizeFirstLetter(value.calendar())
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
