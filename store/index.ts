import { combineReducers, Store } from 'redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import userReducer from 'store/user';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { HYDRATE } from 'next-redux-wrapper';
import { CombinedState, AnyAction } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// https://devsner.tistory.com/143 참고
// https://velog.io/@junho0956/redux-toolkit-%EC%B4%88%EA%B8%B0%EC%84%A4%EC%A0%95-with-NextJS-hydration

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// state의 자료형을 뭘로 해야 하는가? RootState ... ?
const rootReducer = (state: any, action: AnyAction): CombinedState<any> => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
      });
      return combinedReducer(state, action);
    }
  }
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // 위에서 만든 persistReducer를 대입
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const makeStore: MakeStore<EnhancedStore> = () => {
  return store;
};

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper<Store>(makeStore, { debug: false });
//  process.env.NODE_ENV !== 'production'
