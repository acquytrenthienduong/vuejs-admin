import DropDown from "./components/Dropdown.vue";
import NewChartCard from './components/Cards/NewChartCard.vue';

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.component("newchart-card", NewChartCard);
  }
};

export default GlobalComponents;
