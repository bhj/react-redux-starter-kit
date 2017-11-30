import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createResponsiveStateReducer } from 'redux-responsive'

// reducers
import library from 'routes/Library/modules/library'
import location from './modules/location'
import prefs from './modules/prefs'
import providers from './modules/providers'
import queue from 'routes/Queue/modules/queue'
import rooms from './modules/rooms'
import status from './modules/status'
import ui from './modules/ui'
import user from './modules/user'

export const makeRootReducer = (asyncReducers) => {
  const reducers = {
    library,
    location,
    prefs,
    providers,
    queue,
    rooms,
    status,
    ui,
    user,
    viewport: createResponsiveStateReducer(null, {
      extraFields: () => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    }),
    ...asyncReducers
  }

  const persistConfig = {
    key: 'primary',
    whitelist: ['user'],
    storage,
  }

  return persistCombineReducers(persistConfig, reducers)
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
