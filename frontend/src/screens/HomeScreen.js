import React, { useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
//redux
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  //fetch products on component load
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);  
  
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  console.log(products)

  return (
    <>
      <h1>Latest Products</h1>

      {/* {products.map((product) => {
        <h3>{product.name}</h3>;
      })} */}
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
