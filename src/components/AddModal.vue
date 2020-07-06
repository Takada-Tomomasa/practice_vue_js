<template>
  <div id="overlay" v-show="showContent">
    <div id="content">
      <h2>ストーリーを追加</h2>
      <p>ストーリー名</p>
      <!-- <input type="text" v-model="addStoryName" /> -->
      <p>内容</p>
      <!-- <textarea
        name="contents"
        v-model="addStoryContents"
        rows="4"
        cols="40"
        placeholder="内容を入力してください。"
        onfocus="this.placeholder = ''"
      ></textarea> -->
      <!-- <p>
        <button v-on:click="closeModal">キャンセル</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button v-on:click="addItem">保存</button>
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showContent: Boolean
  }
};
</script>

<style>
#overlay {
  /* 要素を重ねた時の順番 */
  z-index: 1;

  /* 画面全体を覆う設定 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center; /*縦中央*/
  justify-content: center; /*横中央*/
}
#content {
  z-index: 2;
  width: 30%;
  padding: 1em;
  padding-left: 6em;
  background-color: #ffffcc;
}
</style>