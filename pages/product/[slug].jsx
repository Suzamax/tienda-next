import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import Markdown from 'react-markdown-it';

import Cart from '../cart';
import AppContext from '../../context/AppContext';

const GET_PRODUCT = gql`
  query($slug: String!) {
    products(where: { slug: $slug }) {
      id
      name
      description
      price
      slug
      brand {
        name
      }
      pictures {
        url
      }
    }
  }
`;

function Product() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { slug: router.query.slug },
  });
  if (error) return 'Error Loading Product';
  if (loading) return <h1>Loading ...</h1>;
  if (data.products) {
    const { products } = data;
    return (
      <>
        <div>
          <div xs="6" sm="4" style={{ padding: 0 }} key={products[0].id}>
            <div style={{ margin: '0 10px' }}>
              <img
                style={{ height: 250 }}
                src={`${process.env.NEXT_PUBLIC_API_URL}${products[0].pictures[0].url}`}
              />
              <div>
                <h1>{products[0].name}</h1>
                <div className="pa3">
                  <Markdown source={products[0].description} />
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="is-primary"
                  onClick={() => appContext.addItem(products[0])}
                >
                  + Add To Cart
                </button>

                <style jsx>
                  {`
                    a {
                      color: white;
                    }
                    a:link {
                      text-decoration: none;
                      color: white;
                    }
                    .container-fluid {
                      margin-bottom: 30px;
                    }
                    .btn-outline-primary {
                      color: #007bff !important;
                    }
                    a:hover {
                      color: white !important;
                    }
                  `}
                </style>
              </div>
            </div>
          </div>
          <div xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </div>
        </div>
      </>
    );
  }
  return <h1>Add Products</h1>;
}

export default Product;
