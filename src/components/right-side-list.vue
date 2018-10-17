<template>
  <v-navigation-drawer
      permanent
      absolute
      right
      class="right-drawer"
    >
    <ul id="detail-list">
      <li>
        <h3 class="headline">Release Date</h3>
          <label
            class="title font-weight-light"
          >{{details.release_date | moment("M/DD/YYYY")}}</label>
      </li>
      <li>
        <h3 class="headline">Status</h3>
        <label class="title font-weight-light">{{details.status}}</label>
      </li>
      <li>
        <h3 class="headline">Budget</h3>
        <vue-numeric
          class="title font-weight-light"
          separator=","
          currency="$"
          read-only
          v-model="details.budget"
        ></vue-numeric>
      </li>
      <li>
        <h3 class="headline">Revenue</h3>
        <vue-numeric
          class="title
          font-weight-light"
          separator=","
          currency="$"
          read-only
          v-model="details.revenue"
        ></vue-numeric>
      </li>
      <li>
        <h3 class="headline">Runtime</h3>
        <label class="title font-weight-light">{{details.runtime}} min</label>
      </li>
      <li>
        <h3 class="headline">Original Language</h3>
        <label class="title font-weight-light">{{details.original_language}}</label>
      </li>
      <li v-if="details.title != details.original_title">
        <h3 class="headline">Original Title</h3>
        <label class="title font-weight-light">{{details.original_title}}</label>
      </li>
      <li>
        <h3 class="headline">Popularity</h3>
        <label class="title font-weight-light">{{details.popularity}}</label>
      </li>
    </ul>
  </v-navigation-drawer>
</template>
<script>
import VueNumeric from 'vue-numeric';

export default {
  components: {
    VueNumeric,
  },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
.right-drawer{
  background-color: rgba(0, 0, 0, 0.7) !important;
  color: white !important;
}
#detail-list {
  list-style-type: none;
}
#detail-list li {
  margin:30px 0 30px 0;
}
</style>
