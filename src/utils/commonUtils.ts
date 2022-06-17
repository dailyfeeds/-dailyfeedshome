const randomString = (e: number) => {
  e = e || 32;
  const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const a = t.length;
  let n = "";
  let i;
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
};

//获取url参数
const getParams = (url: string) => {
  const params: any = {};
  const search = `?${url.split("?")[1]}`;
  if (search.indexOf("?") === 0 && search.indexOf("=") > 1) {
    const paramArray = unescape(search)
      .substring(1, search.length)
      .split("&");
    if (paramArray.length > 0) {
      paramArray.forEach((currentValue) => {
        params[currentValue.split("=")[0]] = currentValue.split("=")[1];
      });
    }
  }
  return params;
}

//格式化银行卡号
const replaceCardType = (value: string) => {
  return value.replace(/(\d{4})(?=\d)/g, "$1 ");
}

const parseTime = (timestamp: any, cFormat: string) => {
  let time = timestamp;
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  //@ts-ignore
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    //@ts-ignore
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    } // todo 支持英文
    return value.toString().padStart(2, '0');
  });
}

const isNumber = (val: any) => {
  // eslint-disable-next-line no-restricted-globals
  return typeof val === 'number' && !isNaN(val);
}

const getApiNumber = (val: any) => {
  const num = Number(val);
  return isNumber(num) ? num : 'N/A';
}

export { randomString, getParams, replaceCardType, parseTime, getApiNumber }