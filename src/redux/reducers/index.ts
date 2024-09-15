import { combineReducers } from 'redux'
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import boardReducer from './boardReducer'

const persistConfig = {
    key: 'chess_game',
    storage,
    version: 1,
    blacklist: ['isLoading'],
};

const index = combineReducers({
    board: persistReducer(persistConfig, boardReducer),
});

export default index;

export type State = ReturnType<typeof index>;
