<template>
  <div class="CityDish">
    <div class="contents">
      <h3 class="PageTitle">【郷土料理版】</h3>
      <div class="mainContent">
        <span class="selectedFrame">
          <span class="selectedItem">
            {{ slotCity }}
          </span>
        </span>
        <span>は</span>
        <span class="slot-contents ">
          <span class="slot-frame" id="wordbox">
            <span class="slot-view">
            </span>
          </span>
        </span>
        <span>で酒が飲めるぞ</span>

        <table class="dishDetail">
          <tr>
            <td align="right" valign="top" nowrap>別名：</td>
            <td>{{ dishAka }}</td>
          </tr>
          <tr>
            <td align="right" valign="top" nowrap>発祥時期：</td>
            <td>{{ dishDate }}</td>
          </tr>
          <tr>
            <td align="right" valign="top" nowrap>地域：</td>
            <td>{{ dishArea }}</td>
          </tr>
          <tr>
            <td align="right" valign="top" nowrap>料理概要：</td>
            <td>{{ dishOverview }}</td>
          </tr>
        </table>

        <v-layout wrap class="selecterView">
          <v-flex md2 text-center my-5 class="expLabel">
            <span>(都道府県選択)</span>
          </v-flex>
          <v-flex md4 text-center my-5>
            <v-select
              class="selectOpt"
              v-model="selectedCity"
              item-text="name"
              item-value="id"
              :items="city"
              @input="handleSelect"
            >
            </v-select>
          </v-flex>
          <v-flex md4 text-center my-5>
            <v-btn v-on:click="test">酒を呑む！</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cityData: function() {
      return this.$store.getters.getCityDataSet;
    }
  },
  watch: {
    cityData() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      city: "",
      dish: "",
      slotCity: "",
      selectedCity: 0,
      selectedCity_str: "",
      selectedDishs: [],
      toTop: 0,

      dishName: "",
      dishAka: "",
      dishDate: "",
      dishArea: "",
      dishOverview: ""
    };
  },
  methods: {
    init() {
      let mon = [];
      let eve = [];
      this.$store.getters.getCityDataSet.forEach(function(value) {
        mon.push(
          JSON.parse(
            '{"id":' + Number(mon.length) + ',"name":"' + value.city + '"}'
          )
        );
        let curEve = [];
        value.dish.forEach(cnt => {
          curEve.push(cnt);
        });
        eve.push(curEve);
      });
      this.city = mon;
      this.dish = eve;
    },
    handleSelect() {
      // 選択肢を変えたらスロットを初期化
      if (this.selectedCity != this.currentMonth) {
        let workElem = document.getElementsByClassName(
          "slot-view"
        )[0];
        workElem.innerHTML = "";
      }

      if (this.selectedCity != 0) {
        this.currentCity = this.selectedCity;
        this.selectedCity_str = this.city[this.currentCity].name;
        this.slotCity = this.selectedCity_str;
        changeOpt();
      } else {
        this.slotCity = "";
      }
    },
    test() {
      if (this.selectedCity == 0) {
        this.currentCity = 1 + Math.floor(Math.random() * 47);
        this.slotCity = this.city[this.currentCity].name;
        changeOpt();
      }
      let parent = document.getElementsByClassName(
        "slot-view"
      )[0];
      let curStyle = parent.style;
      let wordIndex = animate(this.dish[this.currentCity]);
      curStyle.transitionDuration = "0s";
      curStyle.transform = "";

      let childCount = parent.childElementCount;
      if (childCount == 0) {
        buildSlotItem("");
        childCount++;
      }
      for (let i = 1; i < childCount; i++) {
        parent.lastElementChild.remove();
      }
      for (let i = 0; i < this.dish[this.currentCity].length + wordIndex; i++) {
        let curInd =
          this.dish[this.currentCity].length > i
            ? i
            : i - this.dish[this.currentCity].length;
        buildSlotItem(this.dish[this.currentCity][curInd].dishName);
        this.selectedDishs.unshift(this.dish[this.currentCity[curInd]]);

        if (i == this.dish[this.currentCity].length + wordIndex - 1) {
          this.dishAka = this.dish[this.currentCity][curInd].dishAka;
          this.dishDate = this.dish[this.currentCity][curInd].dishDate;
          this.dishArea = this.dish[this.currentCity][curInd].dishArea;
          this.dishOverview = this.dish[this.currentCity][curInd].dishOverview;
        }
      }
      childCount = parent.childElementCount;
      let movePx = (childCount - 1) * -32;
      curStyle.top = movePx + "px";
      let huga = 0;
      var hoge = setInterval(function() {
        huga++;
        //終了条件
        if (huga > 1) {
          curStyle.transitionDuration = "1s";
          curStyle.transform = "translate(0px, " + Math.abs(movePx) + "px)";
          clearInterval(hoge);
        }
      }, 100);
    }
  }
};

function buildSlotItem(text) {
  let child = document.createElement("div");
  let parent = document.getElementsByClassName(
    "slot-view"
  )[0];
  child.className = "slot-item";
  child.innerHTML = text;
  parent.prepend(child);
}

function randomSlotttIndex(max) {
  let randIndex = (Math.random() * max) | 0;
  return randIndex;
}

function animate(dish) {
  let dishlength = dish.length;
  let wordIndex = randomSlotttIndex(dishlength);
  return wordIndex;
}

function changeOpt() {
  let monElem = document.getElementsByClassName("selectedItem")[0];
  monElem.style.transitionDuration = "0s";
  monElem.style.transform = "translate(0px, 32px)";

  let huga = 0;
  var hoge = setInterval(function() {
    huga++;
    //終了条件
    if (huga > 1) {
      monElem.style.transitionDuration = "1s";
      monElem.style.transform = "translate(0px, 0px)";
      clearInterval(hoge);
    }
  }, 100);
}
</script>

<style>
@import "../css/style.css";
</style>
