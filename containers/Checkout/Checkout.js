import React, { Component } from 'react';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as checkoutAction from "../../store/actions/index";

class Checkout extends Component {

   // componentDidMount(){
   //   this.props.onInitPurchase();
   // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {

      let summary= <Redirect to="/" />
      if(this.props.ings)
      {
        const purchasedstate = this.props.purchased ? <Redirect to="/" /> : null
        summary =(
          <div>
               {purchasedstate}
               <CheckoutSummary
                   ingredients={this.props.ings}
                   checkoutCancelled={this.checkoutCancelledHandler}
                   checkoutContinued={this.checkoutContinuedHandler} />
               <Route
                   path={this.props.match.path + '/contact-data'}
                   component={ContactData} />
           </div>
        )

      }

        return (
            summary
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.reducer.ingredients,
        state:state.order.purchased
    }
};

// const mapDispatchToProps = dispatch =>{
//   return{
//     onInitPurchase:()=>dispatch(checkoutAction.purchaseinit())
//   }
// }

export default connect(mapStateToProps)(Checkout);
