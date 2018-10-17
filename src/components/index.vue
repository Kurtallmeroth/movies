<template>
  <div class="video">
    <v-alert
      :value="errorAlert"
      type="error"
    >
      {{msg}}
    </v-alert>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="nowPlaying(1)">
          <v-list-tile-action>
            <v-icon>fiber_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Now Playing</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="popular(1)">
          <v-list-tile-action>
            <v-icon>thumb_up</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Popular</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="topRated(1)">
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Top Rated</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan darken-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{msg}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="goBack()">chevron_left</v-icon>
      <label>Page {{page}}</label>
      <v-icon @click="goForward()">chevron_right</v-icon>
    </v-toolbar>
    <v-content>
      <v-layout row wrap>
        <v-flex xs12 sm4 offset-sm1 class="movie" v-bind:key="movie.id" v-for="movie in movies">
          <movie-list
            ref="movieList"
            :item="movie"
            :msg="msg"
            v-if="movies"
          />
        </v-flex>
      </v-layout>
    </v-content>
    <v-footer color="cyan darken-4" app>
      <span class="white--text">&copy; Kurt Allmeroth Movie Project 2018</span>
    </v-footer>
  </div>
</template>

<script>
import axios from 'axios';
import MovieList from '@/components/movie-list';

export default {
  name: 'Home-Page',
  components: {
    MovieList,
  },
  data() {
    return {
      msg: 'Welcome to Your Movie App',
      movies: [],
      drawer: null,
      page: 1,
      pages: 1,
      navigation: 0,
      errorAlert: false,
    };
  },
  created() {
    this.nowPlaying(1);
  },
  methods: {
    nowPlaying(page) {
      axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=3e3863c0a8399e8a0197c7b346ba01ce&language=en-US&page=${page}`)
        .then((response) => {
          this.page = page;
          this.movies = response.data.results;
          this.pages = response.data.total_pages;
          this.msg = 'Now Playing';
          this.navigation = 0;
        })
        .catch((error) => {
          this.msg = error.msg;
          this.errorAlert = true;
        });
    },
    popular(page) {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3e3863c0a8399e8a0197c7b346ba01ce&language=en-US&page=${page}`)
        .then((response) => {
          this.page = page;
          this.movies = response.data.results;
          this.msg = 'Popular';
          this.pages = response.data.total_pages;
          this.navigation = 1;
        })
        .catch((error) => {
          this.msg = error.msg;
          this.errorAlert = true;
        });
    },
    topRated(page) {
      axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=3e3863c0a8399e8a0197c7b346ba01ce&language=en-US&page=${page}`)
        .then((response) => {
          this.page = page;
          this.movies = response.data.results;
          this.pages = response.data.total_pages;
          this.msg = 'Top Rated';
          this.navigation = 2;
        })
        .catch((error) => {
          this.msg = error.msg;
          this.errorAlert = true;
        });
    },
    goBack() {
      if (this.page >= 2) {
        this.page -= 1;
        if (this.navigation === 0) {
          this.nowPlaying(this.page);
        } else if (this.navigation === 1) {
          this.popular(this.page);
        } else {
          this.topRated(this.page);
        }
      }
    },
    goForward() {
      if (this.page < this.pages) {
        this.page += 1;
        if (this.navigation === 0) {
          this.nowPlaying(this.page);
        } else if (this.navigation === 1) {
          this.popular(this.page);
        } else {
          this.topRated(this.page);
        }
      }
    },
  },
};
</script>

<style>
.movie {
  margin-bottom: 20px !important;
}
</style>
