const schedule = require("node-schedule");
const { login, getEventId, submitCook } = require("./request");
/** 菜单数据 */
const { submitMenus } = require("./menus");
/** 用户信息 */
const userConfig = {
  username: "zhangqd@digiwin.com",
  password: "Tianle199204",
};
/** 用户cookie */
let cookieGlobal = "";
/** 今日eventId */
let eventGlobal = "";

/** 定时登陆 */
schedule.scheduleJob("0 33 16 * * ?", async () => {
  // 登录
  const loginRes = await login(userConfig);
  cookieGlobal = loginRes.headers["set-cookie"][0].split(";")[0];
  console.log("登陆成功！！！", "用户cookie：", cookieGlobal);
});

/** 下单 */
schedule.scheduleJob("5 33 16 * * ?", async () => {
  // 获取eventId
  const eventRes = await getEventId({ cookie: cookieGlobal });
  eventGlobal = eventRes.data.data[0].eventId;
  console.log(
    "获取eventId成功！！！",
    "eventId:",
    eventGlobal,
    ";状态：",
    eventRes?.data?.data[0]?.status
  );
  // 点单
  for (const item of submitMenus) {
    const submitRes = await submitCook({
      cookie: cookieGlobal,
      eventId: eventGlobal,
      teamId: 11,
      cook: item,
    });
    console.log(submitRes.data);
  }
});

// (async ()=>{
//    const res = await submitCook({
//         cookie: 'JSESSIONID=F061CD68C355B990A1314F186578AA49',
//         eventId: 'db25ce39b1d84f2185ede987eafb289c',
//         teamId: 11,
//         cook: submitMenus[0],
//       });
//       console.log(res);
      
// })()