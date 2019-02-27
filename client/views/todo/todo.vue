<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么?"
            @keyup.enter="handleAdd"
        >
        <Item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
            @toggle="toggleTodoState"
        />
        <Tabs
            :filter="filter"
            :todos="todos"
            @clearAllCompleted="clearAllCompleted"
        ></Tabs>
    </section>
</template>

<script>
import {
  mapState, mapActions
} from 'vuex'
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
    metaInfo: {
      title: 'todo page'
    },
    data() {
        return {
            filter: 'all'
        }
    },
    components:{
        Item,
        Tabs
    },
    mounted () {
      if (this.todos && this.todos.length < 1) {
        this.fetchTodos()
      }
    },
    asyncData ({ store, router }) {
      if (store.state.user) {
        return store.dispatch('fetchTodos')
      }
      router.replace('/login')
      return Promise.resolve()
    },
    computed: {
        ...mapState(['todos']),
        filteredTodos(){
            if(this.filter === 'all'){
                return this.todos
            }
            const completed = this.filter === 'completed'
            return this.todos.filter(todo => completed === todo.completed)
        }
    },
    methods: {
        ...mapActions([
          'fetchTodos',
          'addTodo',
          'deleteTodo',
          'updateTodo',
          'deleteAllCompleted'
          ]),
        handleAdd (e){
          const content = e.target.value.trim()
          if (!content) {
            return
          }
          const todo = {
            content,
            completed: false
          }
          console.log('当前要增加的todo', todo)
          this.addTodo(todo)
          e.target.value = ''
        },
        toggleTodoState (todo) {
          console.log('要执行更新了', todo)
          this.updateTodo({
            id: todo.id,
            todo: Object.assign({}, todo, {
              completed: !todo.completed
            })
          })
        },
        clearAllCompleted(){
            // this.todos = this.todos.filter(todo => !todo.completed)
          this.deleteAllCompleted()
        }
    }
}
</script>

<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666

.add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)

</style>


