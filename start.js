const schedule = require("node-schedule");
const {
  login,
  getEventId,
  submitCook,
  cancelOrder,
  submitZiYan,
} = require("./request");
/** 菜单数据 */
const { likeMenus } = require("./menus");
/** 用户信息 */
const userConfig = {
  username: "",
  password: "",
};
/** 用户cookie */
let cookieGlobal = "";
/** 今日eventId */
let eventGlobal = "";
/** 下单成功的菜品 */
let successCookGlobal = {};

/**
 * 获取eventId
 */
async function initEvent() {
  const eventRes = await getEventId({ cookie: cookieGlobal });
  eventGlobal = eventRes.data.data[0].eventId;
  console.log("获取eventId成功！！！");
}
/**
 * 下单
 * @param {object} cook 某个菜品
 */
async function submitMenu(cook) {
  const submitRes = await submitCook({
    cookie: cookieGlobal,
    eventId: eventGlobal,
    teamId: 11,
    cook: cook,
  });
  if (submitRes.data?.status === 200) {
    successCookGlobal = submitRes.data?.data;
    console.log("点单成功!，菜品是：", submitRes.data?.data?.name);
  } else {
    console.log("点单失败:", cook.productName);
    // Promise.reject("点单失败");
    throw new Error("点单失败");
  }
}
/**
 * 循环下单
 */
async function cycleSubmit() {
  for (const item of likeMenus) {
    try {
      await submitMenu(item);
      break;
    } catch (error) {
      console.log(error);
    }
  }
}

/** 定时登陆 */
schedule.scheduleJob("0 59 15 ? * 2,4", async () => {
  const loginRes = await login(userConfig);
  cookieGlobal = loginRes.headers["set-cookie"][0].split(";")[0];
  console.log("登陆成功！！！");
});
/** 准点-先抢紫燕百味鸡 */
schedule.scheduleJob("0 0 16 ? * 2,4", async () => {
  await initEvent();
  const submitRes = Promise.race([
    submitZiYan(cookieGlobal, eventGlobal),
    submitZiYan(cookieGlobal, eventGlobal),
    submitZiYan(cookieGlobal, eventGlobal),
    submitZiYan(cookieGlobal, eventGlobal),
    submitZiYan(cookieGlobal, eventGlobal),
  ]);
  if (submitRes.data?.status === 200) {
    successCookGlobal = submitRes.data?.data;
    console.log("抢购紫燕成功!");
  } else {
    console.log("抢购紫燕失败！");
    // Promise.reject("点单失败");
    throw new Error("点单失败");
  }
});

/** 准时下单 */
schedule.scheduleJob("3 0 16 ? * 2,4", async () => {
  if (eventGlobal) {
    await cycleSubmit();
  }else{
    await initEvent();
    await cycleSubmit();
  }
});

/** 几秒后取消订单-重新下单 */
schedule.scheduleJob("10 0 16 ? * 2,4", async () => {
  const res = await cancelOrder({
    cookie: cookieGlobal,
    eventId: eventGlobal,
    teamId: 11,
    cook: successCookGlobal,
  });
  console.log("取消订单：", res.data);
  try {
    submitMenu(successCookGlobal);
  } catch (error) {
    cycleSubmit();
  }
});
