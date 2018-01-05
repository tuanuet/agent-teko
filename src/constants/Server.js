const isProduction = process.env.NODE_ENV == 'production'

export const API_URL = isProduction ? 'https://chat.teko.vn' : 'http://local.chat.com'
export const NODE_URL = isProduction ? 'https://chat-node.teko.vn' : 'http://localhost:3000'
export const ACCESS_TOKEN = isProduction ? 'EAAYscHRTvCMBABS51bsSyAIVJ96MQm4Ii0ZBxyN4RUdz9alvphJfIaIxhEAoX4I4ucm49rAvyQf47JZCuHjgqmsHQjJjHMF4mMYIBxj4UosGGu0YyaZC4yZAaRSGqz8RXJv2i5JZAFGza2nloZC0KQq7iXonYtqAPFZAZAUZAIKWntgZDZD' : 'EAALE5e31DY4BAGWqowE8N1TQBFVT7IZBQQ8rrb5jQkCXxP6vKslcAvoSpkIhWsRN8aaxGqAijfS6AsdYbXbi3KA3wR9EmSi3gFgwe20azmPZB7U7ZABaQXD7vt5GlnfRztaWvIbRTUC8MFFR9qZCb7WLsZC2zrefiBBLMa6UEZAAZDZD'

export const API_CREATE_TOKEN_URL = API_URL + '/api/createToken'

export const API_UPLOAD_IMAGE_URL = API_URL + '/api/files/upload'

export const API_GET_METADATA_URL = API_URL + '/api/getlink?url='

export const API_GET_TOPIC_URL = API_URL + '/api/gettopics'

export const API_GET_TOKEN_URL = API_URL + '/api/getData?token='

export const SOCKET_URL = NODE_URL + '/chat'
