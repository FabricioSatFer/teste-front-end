<template>
    <div class="home">
        <v-container>
            <h1>API YT</h1>
            <v-row>
                <v-col cols="12" xs="12" md="6" offset-md="3">
                <v-form ref="form" id="search" lazy-validation>
                    <v-text-field class=" align-center" label="Procure um video" v-model="q" outlined append-icon="mdi-magnify" @click:append="getInfos"></v-text-field>
                    <!-- <v-btn xs12 md6 class="primary" @click="getInfos">submit</v-btn> -->
                </v-form>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="3" md="4" xs="12" class="d-flex align-center" v-for="item in items" :key="item.id.videoId">
                    <v-card class="mx-auto" :hover="2" :flat="flat" :loading="loading" :outlined="outlined" :elevation="elevation" :max-width="350" :max-height="400">
                        <v-img class="white--text" height="200px" :src="item.snippet.thumbnails.high.url" ></v-img>
                        <v-card-title>{{item.snippet.title}}</v-card-title>
                        <v-card-text><strong>{{item.snippet.channelTitle}}</strong></v-card-text>
                        <!-- <v-card-text>Descrição do vídeo: {{maxCaracterDescricao(item.snippet.description)}}</v-card-text> -->
                        <v-card-actions>
                            <v-btn class="mr-4" :href="'/detalhes/'+item.id.videoId">DETALHES DO VÍDEO</v-btn>
                            <v-btn icon @click="show = !show"><v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn>
                        </v-card-actions>
                        <v-expand-transition>
                            <div v-show="item.show">
                                <v-card-text>
                                {{maxCaracterDescricao(item.snippet.description)}}
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div> 
</template>
<style scoped>
/* #search{
    padding-top: 40%;
    animation-name: descer;
    animation-duration: 2s;
}
#search:focus-within{
    padding-top: 0;
    animation-name: subir;
    animation-duration: 1.5s;
}

@keyframes subir {
0%   {padding-top: 40%}
100% {padding-top: 0}
}
@keyframes descer {
0%   {padding-top: 0}
100% {padding-top: 40%}
} */

</style>

<script>
export default {

    data: () => ({
    
        // part: 'id,snippet',
        // key:"AIzaSyA3H9mjzts_872H73Or-5ppxvWWNRqtbdE",
        q:"",
        items:[],
        video:[],
        show: false
        
    }),

    methods:{

        abreDescricao(videoId) {
            //var id = videoId.videoId
            var id = videoId
            console.log(id)
            //return id.show == false? !show : show  
        },

        maxCaracterDescricao (descricao) {
            let body = descricao;

            return body.length > 100 ? body.substring(0, 100) + '...' : body;           
        },

        getInfos(){
            this.$http.get("https://www.googleapis.com/youtube/v3/search?part=id,snippet&q="+this.q+"&key=AIzaSyA3H9mjzts_872H73Or-5ppxvWWNRqtbdE")
            .then(response => {
                this.items = response.body.items
                console.log(this.items);
            });
        },

        // detalhes(videoId){
        //     this.$http.get("https://www.googleapis.com/youtube/v3/videos?id="+videoId+"&part=snippet,statistics&key=AIzaSyA3H9mjzts_872H73Or-5ppxvWWNRqtbdE")
        //     .then(response => {
        //         this.video = response.body.items
        //         console.log(this.video);
        //     });
        // }

    }
}
</script>