import React from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';
// import Axios from 'axios'; DONT NEED NOW THAT WE HAVE AXIOS WITH AUTH

import { axiosWithAuth } from '../utils/axiosWithAuth';

class GasPrices extends React.Component {
  state = {
    gasPrices: [] // all data goes in here.
  };

  // I still do not know what all this mount stuff is.
  // Intructor said when this first mounts, we want to get our data. 
  // What exactly is this doing?
  componentDidMount() {
    this.getData();
  };

  // Use get
  // This function simply grabs the axios data
  // the get call has 2 parameters. one is the url and the other is an object which contains a headers object.
  // res is now the entire piece of data. data.data.[0].keys
  // console.log("🚀 GasPrices.js ~ GasPrices ", res) //  an array of objects
  // getData = () => {
    //   // Axios
    //   .get('http://localhost:5000/api/data', {
      //       headers: {
        //         authorization: localStorage.getItem('token')
        //       }
        //     }) 
        //     .then(res => {
          //       this.setState({
            //         gasPrices: res.data.data
            //         })
          
            //       })
  //     .catch(err => console.log('ERR!!! in GasPrices.js: getData()', err.response)) // err.response gives us a lot more info on the error. Why?
  // };
  
  
  getData = () => {
    axiosWithAuth()
    .get('/data')
    .then(res => {
      console.log('GasPrices.js / getData =', res)
      this.setState({
        gasPrices: res.data.data
      })
    })
      .catch(err => console.log('Error is GasPrices.js: getData: ', err))
  }




  // ?
  formatData = () => {
    const formattedData = [];
    this.state.gasPrices.forEach((price, index, arr) => {
      if (price.location === 'US') {
        formattedData.push({
          id: index,
          date: moment(price.date).format('MMM'),
          USPrice: price.price,
          HawaiiPrice: arr[index + 1].price
        });
      }
    });
    return formattedData;
  };

  render() {
    const gasPrices = this.formatData();
    return (
      <div className="gas-prices">
        <div className="title-wrapper">
          <div className="title">
            <div className="inner-wrapper">
              <div className="top-title">Gas Comparison</div>
              <div className="bottom-title">Continental US vs Hawaii</div>
            </div>
          </div>
        </div>
        <div className="key">
          <div className="US-key" />
          <p className="US-key-text">Continental US Prices</p>
          <div className="Hawaii-key" />
          <p className="Hawaii-key-text">Hawaii Prices</p>
        </div>
        {this.props.fetchingData && (
          <div className="key spinner">
            <Loader type="Puff" color="#204963" height="60" width="60" />
            <p>Loading Data</p>
          </div>
        )}
        {gasPrices.length > 0 && (
          <div className="gas-wrapper">
            <div className="columns">
              <div className="months">
                <div className="year">999999999</div>
                <div className="year">2007</div>
                <div className="year">2008</div>
                <div className="year">2009</div>
                <div className="year">2010</div>
                <div className="year">2011</div>
                <div className="year">2012</div>
              </div>
              <div>
                {gasPrices.map(price => (
                  <div key={price.id} className="price-graph">
                    <div className="date">
                      <p>{price.date}</p>
                    </div>
                    <div className="hawaii-graph">
                      <div
                        className="hawaii-line"
                        style={{
                          width: `${(Number(price.HawaiiPrice) / 5) * 100}%`
                        }}
                      />
                      <p>${price.HawaiiPrice}</p>
                    </div>
                    <div className="us-graph">
                      <div
                        className="us-line"
                        style={{
                          width: `${(Number(price.USPrice) / 5) * 100}%`
                        }}
                      >
                        <p>${price.USPrice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GasPrices;
