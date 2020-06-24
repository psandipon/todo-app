<template>
  <v-container>
    <v-card>
      <v-card-title>TODO</v-card-title>
    </v-card>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="todo.task"
          label="Outlined"
          placeholder="Placeholder"
          outlined
          @keyup.enter="addTodo()"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-toolbar>
      <v-btn outlined @click="changeDecision(0)">All</v-btn>
      <v-btn outlined class="mx-5" @click="changeDecision(1)">Active</v-btn>
      <v-btn outlined @click="changeDecision(2)">Completed</v-btn>
      <v-spacer />
      <v-btn outlined @click="clearCompleted()">Clear Completed</v-btn>
    </v-toolbar>

    <v-card class="mt-5">
      <v-row v-for="(todo, i) in getTodos" :key="i">
        <v-row class="ma-2 pa-2">
          <v-btn fab small class="mx-2" @click="updateToDone(todo)">
            <v-icon>{{getIcon(todo)}}</v-icon>
          </v-btn>

          <div class="title mx-5" :class="getClass(todo)">
            <!-- :class="getTodoClass(todo)" -->
            <v-card flat v-if="todo.show" class="pa-2" @click="todo.show = false">{{todo.task}}</v-card>
            <v-text-field
              v-if="!todo.show"
              class="red red--text"
              v-model="todo.task"
              placeholder="Placeholder"
              solo
              @keyup.enter="addTodo()"
              hide-details
              @blur="todo.show = true"
            ></v-text-field>
          </div>
        </v-row>
      </v-row>
    </v-card>
    {{decision}}
    <pre>   {{todos }} </pre>
  </v-container>
</template>

<script>
export default {
  name: "todo",

  data: () => ({
    todos: [
      {
        task: "One",
        status: 0,
        show: true
      },
      {
        task: "Two",
        status: 1,
        show: true
      },
      {
        task: "Three",
        status: 0,
        show: true
      },
      {
        task: "asfsda",
        status: 1,
        show: true
      }
    ],
    decision: 0,
    todo: {
      task: "",
      status: 0
    }
  }),

  methods: {
    changeDecision(val) {
      this.decision = val;
    },
    updateToDone(todo) {
      if (todo.status == 0) {
        todo.status = 1;
      } else {
        todo.status = 0;
      }
    },
    getIcon(todo) {
      if (todo.status == 0) {
        return "";
      } else {
        return "mdi-check";
      }
    },
    getClass(todo) {
      if (todo.status == 0) {
        return "";
      } else {
        return "text-decoration-line-through";
      }
    },
    getTodoClass(todo) {
      if (todo.status == 0) {
        return "";
      } else {
        return "  red red--text";
      }
    },
    addTodo() {
      this.todos.push(this.todo);
      this.todo = {
        task: "",
        status: 0
      };

      console.log(this.todos);
    },
    clearCompleted() {
      this.todos = this.todos.filter(obj => {
        return obj.status == 0;
      });
    }
  },
  computed: {
    getTodos() {
      if (this.decision == 0) {
        return this.todos;
      }
      if (this.decision == 1) {
        let filteredTodo = [];
        filteredTodo = this.todos.filter(obj => {
          return obj.status == 0;
        });
        return filteredTodo;
      }
      if (this.decision == 2) {
        let filteredTodo = [];
        filteredTodo = this.todos.filter(obj => {
          return obj.status == 1;
        });
        return filteredTodo;
      }
    }
  }
};
</script>
