export function getLiquidity(currentAssets, currentLiabilities) {
  return (Number(currentAssets) / Number(currentLiabilities)).toFixed(2)
}

export function getNetProfitMargin(netIncome, totalRevenue) {
  return ((Number(netIncome) / Number(totalRevenue)) * 100).toFixed(2)
}