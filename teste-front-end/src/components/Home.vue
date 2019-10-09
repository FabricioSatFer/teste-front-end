<template>
    <div class="home">
        <v-container>
            <h1>API YT</h1>
            <v-row>
                <v-col cols="12" xs="12" md="6" offset-md="3">
                    <v-form ref="form" id="search" lazy-validation>
                        <v-text-field class=" align-center" label="Procure um video" v-model="api.q" outlined append-icon="mdi-magnify" @click:append="busca"></v-text-field>
                    </v-form>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="3" md="4" sm ="6" xs="12" class="d-flex align-center" v-for="item in items" :key="item.id.videoId">
                    <v-card class="mx-auto" :hover="2" :flat="flat" :loading="loading" :outlined="outlined" :elevation="elevation" :max-width="350" >
                        <v-img class="white--text" height="200px" :src="item.snippet.thumbnails.high.url" ></v-img>
                        <v-card-title>{{item.snippet.title}}</v-card-title>
                        <v-card-text><strong>{{item.snippet.channelTitle}}</strong></v-card-text>
                        <v-card-text>Descrição do vídeo: {{maxCaracterDescricao(item.snippet.description)}}</v-card-text>
                        <v-card-actions>
                            <v-btn class="mr-4" :href="'/detalhes/'+item.id.videoId">DETALHES DO VÍDEO</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    <observer v-on:intersect="intersected" v-show="show" />
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

.observer{
    height: 1px;
}
</style>

<script>
import Observer from './Observer'
export default {

    components:{
        Observer
    },
    
    data: () => ({
    
        items:[],
        paginas: null,
        pageToken: 1,
        show: false,
        stringBusca:'',
        api: {
            url: 'https://www.googleapis.com/youtube/v3/search?', 
            part: 'id,snippet',
            type: 'video',
            order: 'viewCount',
            maxResults: 10,
            q: '',
            key: 'AIzaSyBqwVOowEKCioA2p8lq9yaNehIic-EBGl4', // chave ctestecasei1@gmail.com
            prevPageToken: '',
            nextPageToken: ''
        }
    }),

    methods:{

        // Limitador de caracteres da descrição
        maxCaracterDescricao (descricao) {
            let body = descricao;

            return body.length > 30 ? body.substring(0, 30) + '...' : body;           
        },

        // busca através do input
        busca(){
            const {url, part, type, order, maxResults, q, key} = this.api;
            const urlBusca = `${url}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}` //monta url
            this.getInfos(urlBusca)
            this.show = true;
            
        },

        // Método principal de busca da API
        getInfos(urlFunction){
            // const key = "AIzaSyBqwVOowEKCioA2p8lq9yaNehIic-EBGl4"   chave final fabricio
            // const key = "AIzaSyA3AhhbXRWrjBjZG-UD1sYxgghgOPZNf2s" // chave ctestecasei1@gmail.com
            // const key = "AIzaSyDYjWqAfCPCEWLIoOfo4FTXYLLoVOlg-2w" // chave ctestecasei2@gmail.com
            this.$http.get(urlFunction)
            .then(response => {
                this.items = response.body.items
                this.api.nextPageToken = response.data.nextPageToken //token página anterior
            });
        },

        async intersected(){
            const {url, part, type, order, maxResults, q, nextPageToken, key} = this.api;
            const urlBusca = `${url}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&pageToken=${nextPageToken}&key=${key}`
            const res = await fetch(urlBusca).then(res => res.json())
                .then(res => {
                    this.api.nextPageToken = res.nextPageToken;
                    const items = res.items;
                    this.items = [... this.items, ...items];
                })
            console.log(this.items)
        }
    }
}
</script>