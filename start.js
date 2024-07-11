const schedule = require("node-schedule");
const { login, getEventId, submitCook, cancelOrder} = require("./request");
/** 菜单数据 */
const { submitMenus } = require("./menus");
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
let successCook = {};
/** 
 * 自动下单
 */
async function startCook(){
 // 获取eventId
 const eventRes = await getEventId({ cookie: cookieGlobal });
 eventGlobal = eventRes.data.data[0].eventId;
 console.log("获取eventId成功！！！");
 // 点单
 for (const item of submitMenus) {
   const submitRes = await submitCook({
     cookie: cookieGlobal,
     eventId: eventGlobal,
     teamId: 11,
     cook: item,
   });
   if (submitRes.data?.status === 200) {
     console.log("点单成功!，菜品是：",submitRes.data?.data?.name);
     break;
   }
 }
}

/** 定时登陆 */
schedule.scheduleJob("0 59 15 ? * 2,4", async () => {
  const loginRes = await login(userConfig);
  cookieGlobal = loginRes.headers["set-cookie"][0].split(";")[0];
  console.log("登陆成功！！！");
});

/** 准时下单 */
schedule.scheduleJob("0 0 16 ? * 2,4", async () => {
  startCook()
});

/** 几秒后取消订单-重新下单 */
schedule.scheduleJob("5 0 16 ? * 2,4", async () => {
  const res = await cancelOrder({
    cookie: cookieGlobal,
    eventId: eventGlobal,
    teamId: 11,
    cook: successCook,
  })
  console.log(res.data);
  startCook()
});
