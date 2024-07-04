const schedule = require("node-schedule");
const { login, getEventId, submitCook } = require("./request");
/** 菜单数据 */
const { submitMenus } = require("./menus");
/** 用户信息 */
const userConfig = {
  username: "",
  password: "",
};
/** 用户cookie */
const cookieGlobal = "";
/** 今日eventId */
const eventGlobal = "";

/** 定时登陆 */
schedule.scheduleJob("0 59 15 * * ?", async () => {
  // 登录
  const loginRes = await login(userConfig);
  cookieGlobal = loginRes.headers["set-cookie"][0].split(";")[0];
});

/** 下单 */
schedule.scheduleJob("0 0 16 * * ?", async () => {
  // 获取eventId
  const eventRes = await getEventId({ cookie: cookieGlobal });
  eventGlobal = eventRes.data.data[0].eventId;
  // 点单
  for (const item of submitMenus) {
    const submitRes = await submitCook({
      cookie: cookieGlobal,
      eventId: eventGlobal,
      cook: item,
    });
    console.log(submitRes.data);
  }
});
