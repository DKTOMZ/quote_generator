import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import quotesReducer from "../features/quotes/quotesSlice";
import { setQuotes } from "../features/quotes/quotesSlice";

export const listenerMiddleWare = createListenerMiddleware();
listenerMiddleWare.startListening({
    actionCreator: setQuotes,
    effect: (action,listenerApi) => (sessionStorage.setItem('appState', JSON.stringify(listenerApi.getState())))
});

const appInitialState = JSON.parse(sessionStorage.getItem('appState')) || null;

export default configureStore({
    preloadedState: {quotes: appInitialState?.quotes ? appInitialState?.quotes : []},
    reducer: {
        quotes: quotesReducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(listenerMiddleWare.middleware) 
});