<template>
  <div class="task">
    <h1>ToDoリスト</h1>
    <input type="radio" value="all" name="status" v-model="openStatus">すべて
    <input type="radio" value="working" name="status" v-model="openStatus">作業中
    <input type="radio" value="complete" name="status" v-model="openStatus">完了
    <table>
      <tr>
        <th>ID</th>
        <th>コメント</th>
        <th>状態</th>
      </tr>
      <tr v-for="item in items" v-bind:key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.taskName }}</td>
        <td><button @click="changeStatus(item.id)">{{ item.status }}</button></td>
        <td><button @click="deleteTask(item.id)">削除</button></td>
      </tr>
    </table>
    <h2>新規タスクの追加</h2>
    <input type="text" v-model="newTaskName">
    <button @click="addTask">追加</button>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data: function() {
    return {
      newTaskName: '',
      openStatus: 'all',
    }
  }, 
  methods: {
    addTask: function() {
      this.$store.commit('addTask', this.newTaskName);
      this.newTaskName = '';
    }, 
    deleteTask: function(id) {
      this.$store.commit('deleteTask', id);
    }, 
    changeStatus: function(id) {
      this.$store.commit('changeStatus', id);
    }
  }, 
  computed: {
    items: function() {
      switch (this.openStatus) {
        case 'working': 
          return this.$store.state.tasks.filter(element => (element.status === '作業中'));
        case 'complete':
          return this.$store.state.tasks.filter(element => (element.status === '完了'));
        default: 
          return this.$store.state.tasks;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
