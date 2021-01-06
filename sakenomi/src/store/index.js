import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monthDataSet: {},
    cityDataSet: {},
  },
  mutations: {
    monthDataSet(state, result) {
      state.monthDataSet = result;
    },
    cityDataSet(state, result) {
      state.cityDataSet = result;
    },
  },
  actions: {
    commitMonthDataSet(store) {
      axios
        .get(
          "https://ja.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=%E5%B9%B4%E4%B8%AD%E8%A1%8C%E4%BA%8B&explaintext=1"
        )
        .then((response) => {
          let data = response.data.query.pages[57776].extract.split("\n");
          let allEvent = [];
          allEvent.push(JSON.parse('{"month":"(ランダム)", "event":[""]}'));
          for (let x in data) {
            let y = data[x].split("===");
            if (y.length == 3) {
              let ary = [];
              let z = data[Number(x) + 1].split("-");
              for (let zz in z) {
                ary.push('"' + z[zz].trim() + '"');
              }
              allEvent.push(
                JSON.parse(
                  '{"month":"' + y[1].trim() + '", "event":[' + ary + "]}"
                )
              );
            }
          }
          // 順番を一月～に並び替える
          allEvent.splice(1, 0, allEvent[10], allEvent[11], allEvent[12]);
          allEvent.splice(13, 15);
          store.commit("monthDataSet", allEvent);
        })
        .catch((reason) => {
          console.log(reason.message);
        });
    },
    commitCityDataSet(store) {
      axios
        .get(
          "https://ja.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=revisions&titles=%E6%97%A5%E6%9C%AC%E3%81%AE%E9%83%B7%E5%9C%9F%E6%96%99%E7%90%86%E4%B8%80%E8%A6%A7&rvprop=content"
        )
        .then((response) => {
          let data = response.data.query.pages["664973"].revisions[0][
            "*"
          ].split("===");
          let test = data;
          let allEvent = [];
          allEvent.push(JSON.parse('{"city":"(ランダム)", "dish":[""]}'));
          for (let x = 1; x < test.length; x = x + 2) {
            let y = test[x].split("-->");
            let city = y[1];
            let dishes = test[x + 1].split("|-\n||[[");
            let ary = [];
            let max = dishes.length;
            if (x == 57) {
              max = dishes.length;
            }
            for (let z = 1; z < max; z++) {
              let dishName = buildString(dishes[z].split("||")[0]); //料理名
              let dishAka = buildString(dishes[z].split("||")[1]); //別名
              let dishDate = buildString(dishes[z].split("||")[2]); //発祥時期
              let dishArea = buildString(dishes[z].split("||")[3]); //地域
              let dishOverview = buildString(dishes[z].split("||")[4]); //料理概要
              let push_data =
                '{"dishName":' +
                dishName +
                ', "dishAka":' +
                dishAka +
                ', "dishDate":' +
                dishDate +
                ', "dishArea":' +
                dishArea +
                ', "dishOverview":' +
                dishOverview +
                "}";
              push_data = push_data.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
              ary.push(push_data);
            }
            allEvent.push(
              JSON.parse('{"city":"' + city.trim() + '", "dish":[' + ary + "]}")
            );
          }
          store.commit("cityDataSet", allEvent);
        })
        .catch((reason) => {
          console.log(reason.message);
        });
    },
  },
  getters: {
    getMonthDataSet: (state) => state.monthDataSet,
    getCityDataSet: (state) => state.cityDataSet,
  },
});

function buildString(str) {
  var result =
    '"' +
    str
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/\n/g, "\\n")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/&/g, "\\&")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\b/g, "\\b")
      .replace(/\f/g, "\\f") +
    '"';
  result = result.replace(/\|/g, "　※");
  return result;
}
