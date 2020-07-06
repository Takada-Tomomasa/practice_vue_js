<template>
  <div id="overlay" v-show="showDetails" @click="closeModalDetails">
    <div id="content" @click="stopModal">
      <h2>詳細</h2>
      <p>ストーリー名</p>
      <textarea name="name" v-model="storyName" rows="1" cols="20"></textarea>
      <p>作業項目</p>
      <p>内容</p>
      <textarea name="contents" v-model="storyContents" rows="4" cols="40"></textarea>
      <p>
        <button v-on:click="closeModalDetails">キャンセル</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button v-on:click="changeItem">保存</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button v-on:click="removeItem">削除</button>
      </p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
</style>