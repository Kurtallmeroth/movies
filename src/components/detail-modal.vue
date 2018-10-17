<template>
  <div id="details">
    <v-img
      :gradient="gradient"
      :src=" backdropUrl()"
    >
      <v-container class="image">
        <img
          :src="posterUrl()"
          aspect-ratio="1"
        >
        <v-layout row wrap>
          <v-flex xs4 sm4 offset-sm1>
            <h3 class="headline">Description</h3>
            <p class="overview text-sm-left">{{details.overview}}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs4 sm4 offset-sm1>
            <h3 class="headline">Genres</h3>
            <v-chip v-for="genre in details.genres" v-bind:key="genre.id">{{genre.name}}</v-chip>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="circle-data">
          <v-flex xs4 sm4 offset-sm1>
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="details.vote_average * 10"
              color="white"
            >
              {{ details.vote_average }}
            </v-progress-circular>
          </v-flex>
        </v-layout>
        <right-side-list
            :details="details"
          />
      </v-container>
    </v-img>
    <v-container>
      <v-layout row wrap v-if="credits.cast">
        <v-flex xs12 sm4 v-for="cast in credits.cast.slice(0, 9)" v-bind:key="cast.id">
          <cast-card
            :cast="cast"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import RightSideList from '@/components/right-side-list';
import CastCard from '@/components/cast-card';
import axios from 'axios';

export default {
  components: {
    RightSideList,
    CastCard,
  },
  props: {
    movieId: {
      type: Number,
      required: true,
    },
    credits: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      gradient: 'to top right, rgba(0,96,100, 90), rgba(25,32,72, .9)',
      details: {},
    };
  },
  methods: {
    posterUrl() {
      let image;
      if (this.details.poster_path) {
        image = `https://image.tmdb.org/t/p/w300${this.details.poster_path}`;
      } else {
        image = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=?&w=120&h=120';
      }
      return image;
    },
    backdropUrl() {
      let image;
      if (this.details.backdrop_path) {
        image = `https://image.tmdb.org/t/p/w1280${this.details.backdrop_path}`;
      } else {
        image = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=?&w=120&h=120';
      }
      return image;
    },
  },
  created() {
    axios.get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=3e3863c0a8399e8a0197c7b346ba01ce&language=en-US`)
      .then((response) => {
        this.details = response.data;
      })
      .catch((error) => {
        this.msg = error.msg;
      });
  },
};

</script>
<style type="text/css">
#details .container.image{
  max-width: none !important;
  color: white;
}
#details img{
  float: left;
  padding: 0 1em 1em 0;
}
.overview {
  font-size: 16px !important;
  margin-bottom: 40px;
}
.circle-data {
  margin-top: 50px;
}
</style>
