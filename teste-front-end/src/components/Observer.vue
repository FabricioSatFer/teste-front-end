<template>
    <div class="observer"></div>
</template>

<script>
export default {
   name: 'observer',
   data(){
       return{
           observer: null
       };
   },
   
   mounted(){
        this.home = new IntersectionObserver(([entry])=>{
            if(entry && entry.isIntersecting){
                this.$emit('intersect')
            }
        });

        this.home.observe(this.$el);
    },
}
</script>