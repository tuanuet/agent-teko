const isProduction = process.env.NODE_ENV == 'production'

// export const API_URL = isProduction ? 'https://chat.teko.vn' : 'http://local.chat.com'
export const API_URL = isProduction ? 'https://chat.teko.vn' : 'http://localhost:8000'
export const NODE_URL = isProduction ? 'https://chat-node.teko.vn' : 'http://localhost:3000'
export const TEKSHOP_URL = isProduction ? '' : 'http://tekshop.local'
export const ACCESS_TOKEN = isProduction ? 'EAAYscHRTvCMBABS51bsSyAIVJ96MQm4Ii0ZBxyN4RUdz9alvphJfIaIxhEAoX4I4ucm49rAvyQf47JZCuHjgqmsHQjJjHMF4mMYIBxj4UosGGu0YyaZC4yZAaRSGqz8RXJv2i5JZAFGza2nloZC0KQq7iXonYtqAPFZAZAUZAIKWntgZDZD' : 'EAAH7El721IYBALuyXpZCCCw7TB0Dh5A0biUlxx5fueXjjCJ20pJxaaGSPYUYVf3ZAV8MD4sbCoUkYjbyxVXiT2msypMh4UvqmwOoxCA50oc5mjKn5VjOLZC0ZBl5kM2ABo64wvk3kaQF9E4evFZAqVYECRF6NU7jEBZBVoRtzW0AZDZD'
