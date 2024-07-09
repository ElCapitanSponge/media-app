import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import logger from "./middleware/logger.ts"
import monitorReducerEnhancer from "./enhancers/monitorReducer.ts"

export default function configureStore(preloadedState) {
	const middlewares = [logger, thunk]
	const middlewareEnhancer = applyMiddleware(...middlewares)

	const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
	const composedEnhancers = composeWithDevTools(...enhancers)

	const store = createStore(rootReducer, preloadedState, composedEnhancers)

	return store
}
