import React from 'react'


export const formatCurrency = (n, currency) => {
  return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}