export default{
    Mutation: {
        setAuth: (_, { isAuthorized }, { cache }) => {
            cache.writeData({ data: { isAuthorized }})
            return null;
        },
        setName: (_, { name }, { cache }) => {
            cache.writeData({ data: { name }});
            return null;
        },
        setId: (_, { id }, { cache }) => {
            cache.writeData({ data: { id }});
            return null;
        },
        setEmail: (_, { email }, { cache }) => {
            cache.writeData({ data: { email }});
            return null;
        },
        setState: (_, { id, isAuthorized, name, email }, { cache }) => {
            cache.writeData({ data: { id, isAuthorized, name, email }});
            return null;
        },
        setFlyerId: (_, { flyerId }, { cache }) => {
            cache.writeData({data: { flyerId }});
            return null;
        },
        setFlyerName: (_, { flyerName }, { cache }) => {
            cache.writeData({ data: { flyerName}});
            return null;
        },
        setFlyerInfo: (_, { flyerId, flyerName }, { cache }) => {
            cache.writeData({data: { flyerId, flyerName }});
            return null;
        },
        setFlyerIdAndImageName:(_, {flyerId, flyerImageName }, { cache }) => {
            cache.writeData({data: { flyerId, flyerImageName }});
            return null;
        },
        setAppTestState: (_, { appTestState }, { cache }) => {
            cache.writeData({data: { appTestState }});
            return null;
        }
    }
}