// @ts-nocheck
import url from 'url'
let request = {
  get url() {
    return this.req.url;
  },
  get path() {
    return url.parse(this.req.url).pathname;
  }
};
export default request;