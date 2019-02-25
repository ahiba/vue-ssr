<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <!-- <Todo></Todo> -->
        <router-link to="/app">app</router-link>
        <router-link to="/login">login</router-link>
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
    metaInfo: {
      title: 'ahiba todo app'
    },
    components: {
        Header,
        Footer,
        Todo
    },
    mounted () {
      console.log(this.$store)
    }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity 0.2
        z-index -1

</style>
