<template>
  <article>
    <h2>Todo</h2>

    <form @submit.prevent="handleAdd">
      <input type="text" v-model="newTodo" placeholder="Add a Todo" />
    </form>

    <template v-if="data && data.length">
      <ol class="todo-list">
        <li v-for="item in filterItems" :key="item.id">
          <p>{{ item.body }}</p>
          <button type="button" @click="handleDelete(item)">Delete</button>
        </li>
      </ol>
      <PrevNext :totalPage="totalPage" @change="onPageChange" />
    </template>
  </article>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/todos/list");
watch(data.value, async (newData, prev) => {
  await $fetch("/api/todos/save", {
    method: "POST",
    body: JSON.stringify(newData),
  });
});

const { totalPage, filterItems, onPageChange } = usePagination(data.value);
</script>

<script lang="ts">
export default {
  name: "IndexPage",
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    async handleAdd() {
      if (!this.newTodo) return;
      let id = 0;

      if (this.data.length) {
        id = this.data.reduce((acc, cur) => {
          return Math.max(acc, cur.id);
        }, id);
      }

      const todo = {
        id: id + 1,
        body: this.newTodo,
        updatedAt: new Date(),
      };
      this.newTodo = "";
      this.data.unshift(todo);
      return;
    },

    async handleDelete(todo) {
      this.data.splice(this.data.indexOf(todo), 1);
    },
  },
};
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 1rem;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>