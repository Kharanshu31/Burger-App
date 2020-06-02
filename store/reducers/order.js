import * as actionTypes from "../actions/actions";
import {utility} from "../utility";

const initial={
  orders:[],
  loading:false,
  purchased:false
}

const fetchOrdersStart = ( state, action ) => {
    return utility( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return utility( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return utility( state, { loading: false } );
};

const reducer = (state=initial,action) =>{
  switch(action.type)
  {
    case actionTypes.PURCHASE_INIT :
    return {
        ...state,
        purchased:false
    }

    case actionTypes.PURCHASE_BURGER_START :
    return {
        ...state,
        loading:true
    }

    case actionTypes.PURCHASE_BURGER_SUCCESS :
    const neworder={
      ...action.orderData,
      id:action.orderId
    }
    return {
      ...state,
      loading:false,
      purchased:true,
      orders:state.orders.concat(neworder)
    }

    case actionTypes.PURCHASE_BURGER_FAIL :
    return {
        ...state,
        loading:false
    }
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
    default: return state
  }
}

export default reducer;
