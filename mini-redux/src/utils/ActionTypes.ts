/**
 * 得到一个指定长度的随机字符串
 * @param {*} length
 */
function getRandomString(length) {
  return Math.random().toString(36).substr(2, length).split("").join(".");
}

export default {
  INIT() {
    return `@@redux/INIT${getRandomString(6)}`;
  },
  UNKNOWN() {
    return `@@redux/PROBE_UNKNOWN_ACTION${getRandomString(6)}`;
  },
};
