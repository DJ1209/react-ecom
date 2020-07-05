import React from "react";
import { Route } from "react-router-dom";

const Router = props => {
  const { match, data } = props;
  return (
    <>
      {data.product_list.map(product => {
        return (
          <Route
            path={`${match.path}/${product.product_name.toLowerCase()}`}
            component={props => (
              <ProductDetails details={this.props.data} {...props} />
            )}
          />
        );
      })}
    </>
  );
};
export default Router;
