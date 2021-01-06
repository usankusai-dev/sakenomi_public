<template>
  <div class="MonthEvent">
    <div class="contents">
      <h3 class="PageTitle">【月別イベント版】</h3>
      <div class="mainContent">
        <span class="selectedFrame">
          <span class="selectedItem">
            {{ slotMonth }}
          </span>
        </span>
        <span>は</span>
        <span class="slot-contents">
          <span class="slot-frame" id="wordbox">
            <span class="slot-view">
            </span>
          </span>
        </span>
        <span>で酒が飲めるぞ</span>

        <v-layout wrap class="selecterView">
          <v-flex md2 text-center my-5 class="expLabel">
            <span>(月選択)</span>
          </v-flex>
          <v-flex md4 text-center my-5>
            <v-select
              class="selectOpt"
              v-model="selectedMonth"
              item-text="name"
              item-value="id"
              :items="month"
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
    monthData: function() {
      return this.$store.getters.getMonthDataSet;
    }
  },
  watch: {
    monthData() {
      this.init();
    }
  },
  data() {
    return {
      month: "",
      event: "",
      slotMonth: "",
      selectedMonth: 0,
      selectedMonth_str: "",
      selectedEvents: [],
      toTop: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let mon = [];
      let eve = [];

      this.$store.getters.getMonthDataSet.forEach(function(value) {
        mon.push(
          JSON.parse(
            '{"id":' + Number(mon.length) + ',"name":"' + value.month + '"}'
          )
        );
        let curEve = [];
        value.event.forEach(cnt => {
          curEve.push(cnt);
        });
        if (mon.length == 5) {
          curEve.push("花見");
        } else if (mon.length == 6) {
          curEve.push("子供の日");
        } else if (mon.length == 7) {
          curEve.push("田植え");
        } else if (mon.length == 8) {
          curEve.push("七夕");
        } else if (mon.length == 9) {
          curEve.push("暑いの");
        } else if (mon.length == 10) {
          curEve.push("台風");
        } else if (mon.length == 11) {
          curEve.push("運動会");
        } else if (mon.length == 12) {
          curEve.push("何でもないの");
        } else if (mon.length == 13) {
          curEve.push("ドサクサ");
        }

        eve.push(curEve);
      });
      this.month = mon;
      this.event = eve;
    },
    handleSelect() {
      // 選択肢を変えたらスロットを初期化
      if (this.selectedMonth != this.currentMonth) {
        let workElem = document.getElementsByClassName(
          "slot-view"
        )[0];
        workElem.innerHTML = "";
      }

      if (this.selectedMonth != 0) {
        this.currentMonth = this.selectedMonth;
        this.selectedMonth_str = this.month[this.selectedMonth].name;
        this.slotMonth = this.selectedMonth_str;
        changeOpt();
      } else {
        this.slotMonth = "";
      }
    },
    test() {
      if (this.selectedMonth == 0) {
        this.currentMonth = 1 + Math.floor(Math.random() * 11);
        this.slotMonth = this.month[this.currentMonth].name;
        changeOpt();
      }
      let parent = document.getElementsByClassName(
        "slot-view"
      )[0];
      let curStyle = parent.style;
      let wordIndex = animate(this.event[this.currentMonth]);
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
      for (
        let i = 0;
        i < this.event[this.currentMonth].length + wordIndex;
        i++
      ) {
        let curInd =
          this.event[this.currentMonth].length > i
            ? i
            : i - this.event[this.currentMonth].length;
        buildSlotItem(this.event[this.currentMonth][curInd]);
        this.selectedEvents.unshift(this.event[this.currentMonth[curInd]]);
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
  child.innerHTML =
    '<a target="_blank" rel="noopener" href=https://ja.wikipedia.org/wiki/' +
    text +
    ">" +
    text +
    "</a>";
  parent.prepend(child);
}

function randomSlotttIndex(max) {
  let randIndex = (Math.random() * max) | 0;
  return randIndex;
}

function animate(event) {
  let eventlength = event.length;
  let wordIndex = randomSlotttIndex(eventlength);
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
