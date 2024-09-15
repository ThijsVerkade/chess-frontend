import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {Provider} from "react-redux";
import {persistenceStore, store} from './redux/store'
import {Home} from "./pages/home";
import {PersistGate} from "redux-persist/integration/react";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistenceStore}>
            <React.StrictMode>
                <DndProvider backend={HTML5Backend}>
                    <Home />
                </DndProvider>
            </React.StrictMode>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
