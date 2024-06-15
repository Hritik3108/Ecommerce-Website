import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import { persistor, store } from './util/appStore';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './components/home'
import Cart from './components/cart'
import Error from './components/error'
import Contact from './components/contact'
import Auth from './components/auth/index.jsx'
import AllProduct from './components/allProduct/index.jsx'
import ViewProduct from './components/viewProduct/index.jsx'
import MyProfile from './components/myProfile/index.jsx'
import MyOrders from './components/myOrders/index.jsx'
import Wishlist from './components/wishlist/index.jsx'
import DisplayOrder from './components/displayOrder/index.jsx'
import ProtectedRoute from './components/protectedRoute/index.jsx'
import Dashboard from './components/dashboard/index.jsx'
import Users from './components/manage/users.jsx'
import Orders from './components/manage/orders.jsx'
import Products from './components/manage/products.jsx'
import EditOrder from './components/edit/editOrder.jsx'
import EditUser from './components/edit/editUser.jsx'
import EditProduct from './components/edit/editProduct.jsx'
import AddProduct from './components/addProduct/index.jsx'
import Search from './components/search/index.jsx'

const appRouter = createBrowserRouter([
  {
      path: "/",
      element: <App/>,
      errorElement: <Error/>,
      children: [
          {
              path: "/",
              element: <Home/>
          },
          {
            path: "/login",
            element: <Auth/>
          },
          {
              path: "/cart",
              element: <Cart />
          },
          {
            path: "/allProduct",
            element: <AllProduct />
          },
          {
            path: "/product",
            element: <ViewProduct />
          },
          {
            path: "/contact",
            element: <Contact />
          },
          {
            path: "/dashboard",
            element: <ProtectedRoute><Dashboard/></ProtectedRoute>
          },
          {
            path: "/manageusers",
            element: <ProtectedRoute><Users/></ProtectedRoute>
          },
          {
            path: "/edituser",
            element: <ProtectedRoute><EditUser/></ProtectedRoute>
          },
          {
            path: "/manageorders",
            element: <ProtectedRoute><Orders/></ProtectedRoute>
          },
          {
            path: "/editorder",
            element: <ProtectedRoute><EditOrder/></ProtectedRoute>
          },
          {
            path: "/manageproducts",
            element: <ProtectedRoute><Products/></ProtectedRoute>
          },
          {
            path: "/editproduct",
            element: <ProtectedRoute><EditProduct/></ProtectedRoute>
          },
          {
            path: "/createproduct",
            element: <ProtectedRoute><AddProduct/></ProtectedRoute>
          },
          {
            path: "/myprofile",
            element: <MyProfile />
          },
          {
            path: "/order",
            element: <DisplayOrder />
          },
          {
            path: "/myorders",
            element: <MyOrders />
          },
          {
            path: "/search",
            element: <Search />
          },
          {
            path: "/wishlist",
            element: <Wishlist />
          },
      ]
  }, 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={appRouter} />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
