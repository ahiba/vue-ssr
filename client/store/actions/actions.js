// import model from '../../model/client-model'
import model from 'model'
import bus from '../../util/bus'

const handelError = err => {
  if (err.code === 401) {
    bus.$emit('auth')
  }
}

export default {
  fetchTodos ({ commit }) {
    return model
      .getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handelError(err)
      })
  },
  addTodo ({ commit }, todo) {
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
      }).catch(err => {
        handelError(err)
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
      }).catch(err => {
        handelError(err)
      })
  },
  deleteTodo ({ commit }, id) {
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
      }).catch(err => {
        handelError(err)
      })
  },
  deleteAllCompleted ({ commit, state }) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted({ ids })
      .then(data => {
        commit('deleteAllCompleted')
      }).catch(err => {
        handelError(err)
      })
  },
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      model
        .login(username, password)
        .then(data => {
          commit('doLogin', data)
          resolve()
        })
        .catch(err => {
          handelError(err)
          reject(err)
        })
    })
  }
}
