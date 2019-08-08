import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import Store from './store.js';

//create new store instance
export default new Store({
    actions,
    mutations,
    state
});
