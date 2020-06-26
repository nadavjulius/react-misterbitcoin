import axios from 'axios';
import * as moment from 'moment';


async function getRate(coins = 1) {
  const rate = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}&cors=true`);
  return rate.data;
}

async function getMarketPrice(numOfMonths = 6) {
  const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=${numOfMonths}months&format=json&cors=true`)
  const data = res.data.values.map(value => {
      return [_formatDate(value.x * 1000), value.y]
  })
  return data
}

async function getTradeVolume(numOfMonths = 6) {
  const res = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=${numOfMonths}months&format=json&cors=true`)
  const data = res.data.values.map(value => {
      return [_formatDate(value.x * 1000), value.y]
  })
  return data
}

function _formatDate(timeStamp) {
  return moment(timeStamp).format('MMM')
}

export const bitcoinService = {
  getMarketPrice,
  getRate,
  getTradeVolume
}





// import { httpService } from './HttpService';


// export const bitcoinService = {
//     getRate,
//     getMarketPrice,
//     getConfirmedTransactions
// }

// function getRate(coins, currency = 'USD') {
//     return httpService.get(`https://blockchain.info/tobtc?currency=${currency}&value=${coins}`);
// }

// function getMarketPrice(timespan = '3months') {
//     return httpService.get(`https://api.blockchain.info/charts/market-price?timespan=${timespan}&format=json&cors=true`);
// }

// function getConfirmedTransactions(timespan = '3months') {
//     return httpService.get(`https://api.blockchain.info/charts/trade-volume?timespan=${timespan}&format=json&cors=true`);
// }