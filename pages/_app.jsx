import React from 'react';
import App from 'next/app';
import Cookie from 'js-cookie';
import fetch from 'isomorphic-fetch';
import Layout from '../components/Layout';
import AppContext from '../context/AppContext';
import { Provider } from 'next-auth/client';
import withData from '../lib/apollo';
import { ThemeProvider } from 'theme-ui';
import theme from '../styles/theme';

class MyApp extends App {
  state = {
    user: null,
    cart: { items: [], total: 0 },
  };

  componentDidMount() {
    // grab token value from cookie
    const token = Cookie.get('token');

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove('token');
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  addItem = (item) => {
    let items = this.state.cart.items; //Cookie.get('cart');
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => parseInt(i.id, 10) === item.id);
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1;
      console.log(this.state.cart.total, item.price);
      this.setState(
        {
          cart: {
            items: [...items, item],
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookie.set('cart', this.state.cart.items, { sameSite: 'strict' })
      );
    } else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookie.set('cart', this.state.cart.items, { sameSite: 'strict' })
      );
    }
  };
  removeItem = (item) => {
    let items = Cookie.get('cart');
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => parseInt(i.id) === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookie.set('cart', this.state.cart.items, { sameSite: 'strict' })
      );
    } else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      this.setState(
        { cart: { items: items, total: this.state.cart.total - item.price } },
        () => Cookie.set('cart', this.state.cart.items, { sameSite: 'strict' })
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            user: this.state.user,
            isAuthenticated: !!this.state.user,
            setUser: this.setUser,
            cart: this.state.cart,
            addItem: this.addItem,
            removeItem: this.removeItem,
          }}
        >
          <Provider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </AppContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withData(MyApp);
