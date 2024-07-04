const axios = require("axios");
const baseUrl = "https://www.letuo.club";
/**
 * 登录
 * @param {object} req 请求参数
 * @param {string} req.username 用户名
 * @param {string} req.password 密码
 */
function login({ username, password }) {
  return axios({
    method: "post",
    baseURL: baseUrl,
    url: "/apis/auth/login",
    data: { username, password },
  });
}
/**
 * 获取eventId列表
 * @param {string} param0 cookie
 * @returns 
 */
function getEventId({ cookie }) {
  return axios({
    method: "post",
    baseURL: baseUrl,
    url: "/apis/orderEvent/query",
    headers: {
      Cookie: cookie,
    },
    data: {
      pageIndex: 1,
      pageSize: 10,
      sortField: "id",
      sortType: "descending",
      value: {
        teamId: 11,
        name: "",
      },
    },
  });
}
/**
 * 下单
 * @param {string} param0 cookie
 * @param {string} eventId 今日eventId
 * @param {object} cook 订单信息
 * @returns 
 */
function submitCook({ cookie, eventId, cook }) {
  return axios({
    method: "post",
    baseURL: baseUrl,
    url: "/apis/order/submit",
    headers: {
      Cookie: cookie,
    },
    data: {
      eventId,
      ...cook,
    },
  });
}
/**
 * 获取已定单
 * @param {string} param0 cookie
 * @param {string} eventId 今日eventId
 * @returns 
 */
function getExitSubmit({ cookie, eventId }) {
  return axios({
    method: "get",
    baseURL: baseUrl,
    url: "/apis/order/checkEvent",
    headers: {
      Cookie: cookie,
    },
    params: {
      eventId,
    },
  });
}
/**
 * 取消订单
 * @param {string} param0 cookie
 * @param {string} eventId 今日eventId
 * @param {object} cook 订单信息
 * @returns 
 */
function cancelOrder({ cookie, eventId, cook }) {
  return axios({
    method: "post",
    baseURL: baseUrl,
    url: "/apis/order/cancel",
    headers: {
      Cookie: cookie,
    },
    data: {
      eventId,
      ...cook,
    },
  });
}

module.exports = { login, getEventId, submitCook, getExitSubmit,cancelOrder };
