import api from '..';

export function getEntries(){
  return api('get', 'sellerProfile');
};