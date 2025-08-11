<template>
  <div class="count-box">
    <button @click="handleAdd(-1)" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="number">
    <button @click="handleAdd(1)" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleAdd (num) {
      if (this.value <= 0) {
        return
      }
      this.$emit('input', this.value + num)
    },
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        this.$emit('input', this.value)
        return
      }

      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background: #efefef;
    text-align: center;
  }
}
</style>
