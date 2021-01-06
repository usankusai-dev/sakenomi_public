<template>
  <div class="home">
    <div class="SiteTitle">日本全国酒飲み音頭ジェネレーター</div>
    <div v-if="Month">
      <MonthEvent />
    </div>
    <div v-if="City">
      <CityDish />
    </div>
    <div class="changeMode">
      <v-btn v-if="Month" v-on:click="changeCity">郷土料理版に切り替える</v-btn>
      <v-btn v-if="City" v-on:click="changeMonth"
        >月別イベント版に切り替える</v-btn
      >
    </div>
  </div>
</template>

<script>
import MonthEvent from "@/views/MonthEvent.vue";
import CityDish from "@/views/CityDish.vue";

export default {
  data() {
    return {
      Month: true,
      City: false,
      Mode: "month"
    };
  },
  name: "Home",
  components: {
    MonthEvent,
    CityDish
  },
  created() {
    this.$store.dispatch("commitMonthDataSet");
    this.$store.dispatch("commitCityDataSet");
  },
  methods: {
    changeCity() {
      this.Month = false;
      this.City = true;
    },
    changeMonth() {
      this.Month = true;
      this.City = false;
    }
  }
};
</script>
