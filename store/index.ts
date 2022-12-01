import { combineReducers, Store, CombinedState, AnyAction } from 'redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer from 'store/user';
import quizReducer from 'store/quiz';
import solveUserReducer from 'store/user_solve'
import solveReducer from 'store/quiz_solve';
import commentReducer from 'store/comment'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';


// https://devsner.tistory.com/143 참고
// https://velog.io/@junho0956/redux-toolkit-%EC%B4%88%EA%B8%B0%EC%84%A4%EC%A0%95-with-NextJS-hydration

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};



// redux-persist v6 이후에는 react-native의 경우 asyncstorage를 쓰는것이 맞고,
// redux-persist 에서 noop 에러가 발생한다면 윈도우 객체의 존재 여부를 파악하여 알맞는 스토리지를 생성하고 대입할 것.

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage, // react-persist v6 이후에는 AsyncStorage를 써야된다던데..
};

// state의 자료형을 뭘로 해야 하는가? RootState ... ?
const rootReducer = (state: any, action: AnyAction): CombinedState<any> => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
        quiz: quizReducer,
        solve: solveReducer,
        user_solve: solveUserReducer,
        comment: commentReducer
      });
      return combinedReducer(state, action);
    }
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // 위에서 만든 persistReducer를 대입
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const makeStore: MakeStore<EnhancedStore> = () => store;
export const persistor = persistStore(store);
export const wrapper = createWrapper<Store>(makeStore, { debug: process.env.NODE_ENV !== 'production' });
export type RootState = ReturnType<typeof rootReducer>;