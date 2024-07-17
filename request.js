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
    url: "/apis/orderEvent/activeEvents",
    headers: {
      Cookie: cookie,
    },
    data: {
      ids: [11],
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
function submitCook({ cookie, eventId, teamId, cook }) {
  return axios({
    method: "post",
    baseURL: baseUrl,
    url: "/apis/order/submit",
    headers: {
      Cookie: cookie,
    },
    data: {
      eventId,
      teamId,
      createrId: 0,
      createrName: "",
      num: 1,
      status: 0,
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
/** 抢购紫燕百味鸡 */
function submitZiYan(cookie, eventId) {
  return axios({
    method: "post",
    baseURL: baseUrl,
    url: "/apis/order/submit",
    headers: {
      Cookie: cookie,
    },
    data: {
      eventId,
      createrId: 0,
      createrName: "",
      num: 1,
      status: 0,
      teamId: 11,
      productId: 16,
      name: "紫燕夫妻肺片套餐",
      productName: "紫燕夫妻肺片套餐",
      avatar:
        "https://www.letuo.club/meal/meal/36_896c0708258c4aefacedaee94d93361a.jpeg",
    },
  });
}

module.exports = {
  login,
  getEventId,
  submitCook,
  getExitSubmit,
  cancelOrder,
  submitZiYan,
};
