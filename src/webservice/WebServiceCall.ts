// Handels REST API WebService calls
import AppConfig from './config';
import { BloodTestType } from '../types/InterfaceTypes';
import { logger } from "react-native-logs";

const console = logger.createLogger({
  levels: { log: 0, warn: 2, error: 3 }, transportOptions: {
    colors: "ansi"
  }
});

// URL : https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json
export const getWebserviceURL = (): Promise<BloodTestType> => {
  const targetURL = AppConfig.baseUrl + AppConfig.suffix;
  console.log('targetURL: ', targetURL);
  var keepResponse: any, responseStatus: any;
  return new Promise((resolve, reject) => {
    try {
      fetch(targetURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '',
      })
        .then(function (response) {
          console.log('* * * response status:', response.status);
          if (!response.ok) {
            console.error('Error in webservice call. status:', response.status);
            reject(response.status + ' ' + response.statusText)
          } else { responseStatus = response.status; }
          return (response.json());
        })
        .then((response) => {
          keepResponse = response;
        })
        .then(() => {
          try {
            if (typeof keepResponse === 'object') {
              resolve(keepResponse)
              return;
            }
            const parsedJson: BloodTestType = JSON.parse(keepResponse);
            console.log('JSON parse success for request URL:', AppConfig.baseUrl + targetURL);
            resolve(parsedJson);
          } catch {
            const rejectMsg = 'xJSON parse error for Response: ' + JSON.stringify(keepResponse);
            console.error('>>>keepResponse: ', keepResponse);
            reject(rejectMsg);
          }
        })
        .catch((err) => {
          console.log('******* response status:', responseStatus);
          console.error('getWebserviceURL() error:', err, 'for URL:', AppConfig.baseUrl + targetURL );
          console.log('keepResponse: ', keepResponse);
          reject('Check above response for possible error. ' + err);
        });
    } catch (error) {
      const rejectMsg = 'Reject error: [' + error + '] Response: ' + keepResponse;
      reject(rejectMsg);
    }
  });
};
