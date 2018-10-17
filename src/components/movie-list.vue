<template>
  <div>
    <v-card>
      <v-container
        fluid
        grid-list-lg
        @click="movieDetail(item)"
      >
        <v-flex xs12>
          <v-layout>
            <v-flex xs5>
              <v-img
                :src="posterUrl(item)"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{item.title}}</div>
                  <p class="text">{{item.overview}}</p>
                  <div>{{item.release_date | moment("MM/DD/YYYY")}}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            {{item.title}} is rated
            <v-spacer></v-spacer>
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="item.vote_average * 10"
              color="cyan darken-4"
            >
              {{ item.vote_average }}
            </v-progress-circular>
          </v-card-actions>

        </v-flex>
      </v-container>
    </v-card>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
      >
      <v-card class="detail" v-if="dialog">
        <v-toolbar card dark color="cyan darken-4">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <detail-modal
          ref="modal"
          :movieId="item.id"
          :credits="credits"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import DetailModal from '@/components/detail-modal';

export default {
  components: {
    DetailModal,
  },
  props: {
    item: {
      // type: Array,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      details: {},
      credits: {},
      dialog: false,
      title: '',
      movieId: 0,
    };
  },
  methods: {
    movieDetail(movie) {
      this.title = movie.title;
      axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=3e3863c0a8399e8a0197c7b346ba01ce&language=en-US`)
        .then((response) => {
          this.credits = response.data;
          this.dialog = true;
        })
        .catch(() => {
          this.dialog = true;
        });
    },
    posterUrl(movie) {
      let image;
      if (movie.poster_path) {
        image = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
      } else {
        image = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=?&w=120&h=120';
      }
      return image;
    },
  },
};
</script>
<style type="text/css">
.text {
  display: block;
  width: 150px;
  max-height: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.detail{
  min-height: 2500px !important;
}
</style>>

