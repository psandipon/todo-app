<template>
  <v-container>
    <v-row justify="center" align="center">
      <div class="font-weight-medium" style="color:#F0E3E3; font-size: 7rem !important;">todos</div>
    </v-row>
    <v-row justify="center" align="center">
      <v-card width="800px" style="z-index: 3;">
        <v-row>
          <v-col cols="11">
            <v-row>
              <v-icon
                x-large
                class="ml-4 pl-4"
                :dark="todos.length==0"
                style="opacity:.3"
              >mdi-chevron-down</v-icon>
              <v-text-field
                class="ml-0 title pa-2 font-italic custom-placeholer-color"
                style="font-size: 2.5rem !important; color:#9E9E9E;"
                v-model="todo.task"
                label="Outlined"
                placeholder="What needs to be done ?"
                solo
                flat
                @keyup.enter="addTodo()"
                hide-details
              ></v-text-field>
            </v-row>
          </v-col>
        </v-row>
        <v-divider />
        <!-- style="border-bottom: 1px solid #E5E1E5;" -->
        <v-row no-gutters v-for="(todo, i) in getTodos" :key="i">
          <v-hover v-slot:default="{ hover }">
            <v-col no-gutters>
              <v-row no-gutters justify="center" align="center" class="ma-1 pa-1">
                <v-col cols="1">
                  <v-btn fab small class="mx-2 elevation-0" @click="updateToDone(todo)">
                    <v-icon color="green">{{getIcon(todo)}}</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="20">
                  <v-card
                    :class="getClass(todo)"
                    :style="getTodoStyle(todo)"
                    flat
                    v-if="todo.show"
                    @click="todo.show = false"
                    class="title mx-5 pa-2"
                    style="font-size: 1.8rem !important; color:#9E9E9E;"
                  >{{todo.task}}</v-card>
                  <v-text-field
                    v-if="!todo.show"
                    v-model="todo.task"
                    placeholder="Placeholder"
                    solo
                    outlined
                    flat
                    @keyup.enter="todo.show = true"
                    hide-details
                    @blur="todo.show = true"
                    class="title mx-5 pa-0"
                    style="  font-size: 1.8rem !important;"
                  ></v-text-field>
                </v-col>
                <v-col cols="1" v-if="hover && todo.status==0 && todo.show">
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider />
            </v-col>
          </v-hover>
        </v-row>

        <v-divider />
        <v-row class="mb-0" v-if="todos.length!=0">
          <v-col cols="3">
            <v-btn text>{{todos.length}} items left</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn :outlined="decision==0" text @click="changeDecision(0)">All</v-btn>
            <v-btn :outlined="decision==1" text class="mx-5" @click="changeDecision(1)">Active</v-btn>
            <v-btn :outlined="decision==2" text @click="changeDecision(2)">Completed</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn text @click="clearCompleted()">Clear Completed</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card width="750px" height="10px" style="z-index: 2;"></v-card>
      <v-card width="700px" height="10px" style="z-index: 1;"></v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "todo",

  data: () => ({
    todos: [],
    decision: 0,
    todo: {
      task: "",
      status: 0,
      show: true
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
        return "text-decoration-line-through ; ";
      }
    },
    getTodoStyle(todo) {
      if (todo.status == 0) {
        return "";
      } else {
        return "color:#E5E1E5";
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
        status: 0,
        show: true
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
<style >
.custom-placeholer-color input::placeholder {
  color: #eeeeee !important;
  opacity: 1;
}

.theme--light.v-btn {
  color: rgba(0, 0, 0, 0.5) !important;
}
</style>
