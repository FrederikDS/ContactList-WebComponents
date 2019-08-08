export default {
    addItem(state, payload) {
        console.log(`Mutation addItem with ${JSON.stringify(payload)}`);
        // state.items.push(payload);
        state.contacts.push(payload);
        
        return state;
    },
    clearItem(state, payload) {
        console.log(`Mutation clearItem with ${JSON.stringify(payload)}`);
        // state.items.splice(payload.index, 1);
        state.contacts.splice(payload.index, 1);
        return state;
    }
};
