const schedule = require("node-schedule");
const { login, getEventId, submitCook, cancelOrder} = require("./request");
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


/** 紫燕百味鸡 */
const firstCook = {
    teamId: 11,
    productId: 16,
    name: "紫燕夫妻肺片套餐",
    productName:'紫燕夫妻肺片套餐',
    avatar:
      "https://www.letuo.club/meal/meal/36_896c0708258c4aefacedaee94d93361a.jpeg",
  }

 
/**
 * 获取eventId
 */
async function initEvent(){
  const eventRes = await getEventId({ cookie: cookieGlobal });
 eventGlobal = eventRes.data.data[0].eventId;
 console.log("获取eventId成功！！！");
}
/**
 * 抢几次紫燕百味鸡
 */
async function firstStart(){
    await initEvent();
    const req = {cookie: cookieGlobal,
        eventId: eventGlobal,
        cook: firstCook}
   submitCook(req);
   submitCook(req);
   submitCook(req);
   submitCook(req);
   submitCook(req);
 }

// /** 定时登陆 */
// schedule.scheduleJob("0 59 15 ? * 2,4", async () => {
//   const loginRes = await login(userConfig);
//   cookieGlobal = loginRes.headers["set-cookie"][0].split(";")[0];
//   console.log("登陆成功！！！");
// });

// /** 准时下单 */
// schedule.scheduleJob("0 0 16 ? * 2,4", async () => {
//   firstStart()
// });

/** 定时登陆 */
schedule.scheduleJob("0 17 10 ? * 5", async () => {
  const loginRes = await login(userConfig);
  cookieGlobal = loginRes.headers["set-cookie"][0].split(";")[0];
  console.log("登陆成功！！！");
});

/** 准时下单 */
schedule.scheduleJob("0 18 10 ? * 5", async () => {
  firstStart()
});