<template>
    <div class="detalhes">
        <v-container v-for="attr in detalhes" :key="attr.id">
            <v-row>
                <v-col cols="12" lg="6" xs="12" offset-lg="3">
                <h3>{{attr.snippet.title}}</h3>
                    <v-img class="white--text" max-height="450px" :src="attr.snippet.thumbnails.maxres.url" ><svg id="play-yt" style="" viewBox="0 0 100 100"><path fill="#ffffff" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" lg="4" xs="12" offset-lg="3">
                    <p class="text-justify"><strong>{{attr.snippet.channelTitle}}</strong></p>
                </v-col>
                <v-col cols="3" lg="1" xs="3">
                    <p class="text-justify"><v-icon>mdi-thumb-up</v-icon>  {{formataValor(attr.statistics.likeCount)}}</p>
                </v-col>
                <v-col cols="3" lg="2" xs="3">
                    <p class="text-justify"><v-icon>mdi-thumb-down</v-icon>  {{formataValor(attr.statistics.dislikeCount)}}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="9" xs="12" offset-lg="3">
                    <p class="text-justify"><v-icon>mdi-eye</v-icon>  {{formataValor(attr.statistics.viewCount)}}</p>
                    
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="6" xs="12" offset-lg="3">
                    <p class="text-justify">{{attr.snippet.description}}</p>
                </v-col>
            </v-row>
        </v-container>
    </div> 
</template>

<style scoped>
#play-yt{
    opacity: 0.4;
    position: absolute;
    display: block;
    top: 70%;
    left: 20%;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>

<script>
import { METHODS } from 'http'
export default {
    data:() => ({
        detalhes:[],
        api: {
            url: 'https://www.googleapis.com/youtube/v3/videos?', 
            part: 'snippet,statistics',
            key: 'AIzaSyA3AhhbXRWrjBjZG-UD1sYxgghgOPZNf2s', // chave ctestecasei1@gmail.com
        }
        //green:"#429837"
    }),

    created(){
        const {url, part, key} = this.api;
        const urlVideo = `${url}part=${part}&id=${this.$route.params.videoId}&key=${key}`
        this.$http.get(urlVideo)
        .then(data => {
            console.log(data.body.items)
            this.detalhes = data.body.items
        })
    },

    methods:{

        formataValor(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}
</script>