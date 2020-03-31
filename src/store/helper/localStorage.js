
    export const getFromLS = (name, key) => {
        let result;
        let ls = {};
        if (global.localStorage) {
          try { ls = JSON.parse(global.localStorage.getItem(name)) || {}; } 
          catch (e) { }
        }
        result = key ? ls[key] : ls;
        return result;
    }

    export const saveToLS = (name, key, value) => {
      if (global.localStorage) {
        let current =  getFromLS(name);
        let newdata = {...current, [key]: value }
        global.localStorage.setItem(name, JSON.stringify(newdata) );
      }
    }