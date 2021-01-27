import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
export interface GlobalModelState {
	name: string;
}
export interface globalModelType {
	namespace: 'global';
	state: GlobalModelState;
	effects: {
		query: Effect;
	};
	reducers: {
		save: Reducer<GlobalModelState>;
		// 启用 immer 之后
		// save: ImmerReducer<GlobalModelState>;
	};
	subscriptions: { setup: Subscription };
}
const globalModel: globalModelType = {
	namespace: 'global',
	state: {
		name: 'zhang',
	},
	effects: {
		*query({ payload }, { call, put }) {
		},
	},
	reducers: {
		save(state, action) {
			console.log("action=======", action)
			return {
				...state,
				...action.payload,
			};
		},
		// 启用 immer 之后
		// save(state, action) {
		//   state.name = action.payload;
		// },
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				if (pathname === '/') {
					dispatch({
						type: 'query',
					})
				}
			});
		}
	}
};
export default globalModel;