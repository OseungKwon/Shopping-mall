import React from 'react'
import Product from '../../components/Product/Product'

const ProductPage = ({ history, match }) => {
  return (
    <Product history={history} match={match} />
  )
}

export default ProductPage
