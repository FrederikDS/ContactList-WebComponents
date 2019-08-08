

export default {
    addItem(context, payload) {
        console.log(`addItem with ${JSON.stringify(payload)}`);
        context.commit('addItem', payload);
    },
    clearItem(context, payload) {
        console.log(`clearItem with ${JSON.stringify(payload)}`);
        context.commit('clearItem', payload);
    }
};
