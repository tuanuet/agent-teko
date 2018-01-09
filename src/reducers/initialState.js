export default {
    rooms: [],
    agent: {},
    agents: [],
    tags: [],
    currentRoomId: null,
    isLoadingRooms: false,
    isLoadingMessage: false, // TODO: Should remove
    subscriptions: [],
    order: {
        customer: {},
        orderProducts: [{
            id: 172,
            name: 'Bàn phím E-Blue',
            price: '209000.0000',
            instock_status: 1,
            source_url: { base_image: 'https://phongvu.vn/media/catalog/product/cache/23/image/380x/9df78eab33525d08d6e5fb8d27136e95/i/m/image_8.jpg' },
            count: 1
        }],
        searchProducts: []
    }
};

const exampleState = {
    rooms: [{
        roomId: 1,
        roomStatus: 2,
        roomType: 'default',
        roomInfo: {
            latestMessage: {

            },
            numOfUnReadMessages: 1,
            seenAt: '<false|timestamp>',
        },
        messages: [{
            senderId: 1,
            senderName: 'Hải Nam',
            messageType: 100,
            messageFrom: 1,
            content: 'Yo!',
            fileName: null,
            createdAt: '2017-11-09 12:05:95'
        }],
        // topic: {
        //
        // },
        customer: {
            id: 1,
            name: 'Hải Nam',
            phone: '01683978805',
            email: 'lehainam.dev@gmail.com',
            fbId: '1478582735541006',
            createdAt: '2017-11-09 12:05:95',
            updatedAt: '2017-11-09 12:05:95',
        },
        agents: [{}],
        notes: [{}],
        tags: [{}],
        createdAt: '2017-11-09 12:05:95'
    }],
    agent: {
        replies:[{}]
    },
    agents: [{}],
    tags: [{}],
    currentRoomId: 1,
    isLoadingMessage: false,
    subscriptions: [],
    order: {
        customer: {},
        orderProducts: [{
            // ...orderProducts,
            count: 3
        }],
        searchProducts: '<[{}], {}>' // Array on fetching succeed, object error when failed
    }
}
