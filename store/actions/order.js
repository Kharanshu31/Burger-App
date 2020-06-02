import * as actionTypes from "./actions";
import axios from "../../axios-orders";

export const purchaseburgerSuccess=(id,orderData)=>{
  return {
    type:actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId:id,
    orderData:orderData
  }
}

export const purchaseburgerFail=(error)=>{
  return {
    type:actionTypes.PURCHASE_BURGER_FAIL,
    error:error
  }
}

export const purchaseburgerStart=()=>{
  return{
    type:actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseburger=(orderData)=>{
  return dispatch=>{
    dispatch(purchaseburgerStart())
    axios.post( 'https://react-my-burger-52295.firebaseio.com/orders.json', orderData )
        .then( response => {
            dispatch(purchaseburgerSuccess(response.data,orderData))
        } )
        .catch( error => {
            dispatch(purchaseburgerFail(error))
        } );

  }
}

export const purchaseinit =()=>{
  return {
    type:actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get( 'https://react-my-burger-52295.firebaseio.com/orders.json?auth=' + token)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};
