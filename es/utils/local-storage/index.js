const SPLIT_STR = "@";
const localStorage = window.localStorage;
const DATA_PROCESS_MAPPING = {
  number: {
    save: (data) => data,
    parse: (data) => Number.parseFloat(data)
  },
  boolean: {
    save: (data) => data,
    parse: (data) => JSON.parse(data)
  },
  object: {
    save: (data) => JSON.stringify(data),
    parse: (data) => JSON.parse(data)
  },
  default: {
    save: (data) => data,
    parse: (data) => data
  }
};
function getProcess(type) {
  return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING.default;
}
var stdin_default = {
  get(key) {
    try {
      const stringData = localStorage.getItem(key);
      if (stringData) {
        const dataArray = stringData.split(SPLIT_STR);
        let data;
        const now = Date.now();
        if (dataArray.length > 2 && Number(dataArray[2]) < now) {
          localStorage.removeItem(key);
          return null;
        } else {
          const value = decodeURIComponent(dataArray[1]);
          data = getProcess(dataArray[0]).parse(value);
          return data;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  },
  put(key, value, expired) {
    const type = typeof value;
    const process = getProcess(type);
    let storedValue = type + SPLIT_STR + encodeURIComponent(process.save(value));
    if (expired) {
      const time = expired * 24 * 60 * 60 * 1e3 + new Date().getTime();
      storedValue += SPLIT_STR + time;
    }
    localStorage.setItem(key, storedValue);
  },
  clear() {
    localStorage.clear();
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};
export {
  stdin_default as default
};
