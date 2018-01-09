const isProduction = process.env.NODE_ENV == 'production'

export const API_URL = isProduction ? 'https://chat.teko.vn' : 'http://local.chat.com'
export const NODE_URL = isProduction ? 'https://chat-node.teko.vn' : 'http://localhost:3000'
export const TEKSHOP_URL = isProduction ? '' : 'http://tekshop.local'
export const ACCESS_TOKEN = isProduction ? 'EAAYscHRTvCMBABS51bsSyAIVJ96MQm4Ii0ZBxyN4RUdz9alvphJfIaIxhEAoX4I4ucm49rAvyQf47JZCuHjgqmsHQjJjHMF4mMYIBxj4UosGGu0YyaZC4yZAaRSGqz8RXJv2i5JZAFGza2nloZC0KQq7iXonYtqAPFZAZAUZAIKWntgZDZD' : 'EAALE5e31DY4BAGWqowE8N1TQBFVT7IZBQQ8rrb5jQkCXxP6vKslcAvoSpkIhWsRN8aaxGqAijfS6AsdYbXbi3KA3wR9EmSi3gFgwe20azmPZB7U7ZABaQXD7vt5GlnfRztaWvIbRTUC8MFFR9qZCb7WLsZC2zrefiBBLMa6UEZAAZDZD'
