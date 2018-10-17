<template>
  <v-card class="cast">
    <v-card-text>
      <div>
        <h3 class="headline mb-0 text-md-center">{{cast.character}}</h3>
        {{cast.name}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-container fluid grid-list-xl>
         <v-layout row justify-space-between>
          <v-flex xs4 sm2 offset-xs3>
            <img
              :src="castUrl(cast.profile_path)"
              aspect-ratio="1"
              align="middle"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    cast: {
      type: Object,
      required: true,
    },
  },
  methods: {
    castUrl(path) {
      let image;
      if (path) {
        image = `https://image.tmdb.org/t/p/w154${path}`;
      } else {
        image = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=?&w=120&h=120';
      }
      return image;
    },
  },
};
</script>
<style type="text/css">
.cast {
  margin: 10px 10px 10px 10px;
  box-shadow: none !important;
  border: 1px solid rgb(224,224,224);
  border-radius: 5px;
}
</style>
