<template>
  <div class="home">
    <div class="dragBx">
      <img
        class="dragItem"
        v-for="(item,index) in devItem"
        :key="item.id"
        src="../assets/logo.png"
        :draggable="!item.show"
        @dragstart="drag(index,$event)" >
    </div>
    <div class="dragContent" @drop="drop" @dragover="allowDrop" style="position:relative;height:731px">
        <img
          draggable="true"
          @dragstart="itemDrag(index,$event)"
          @dragend="itemDragEnd($event)"
          @click="itemClick(index,$event)"
          class="dragContent-item"
          v-for="(item,index) in imgItem"
          :key="index" :src="item.text"
          alt=""
          :style="item.style" >
    </div>
    <div class="infoBx">
      <P>宽：<input type="text" v-model="currentClick.width"></P>
      <P>高：<input type="text" v-model="currentClick.height"></P>
      <P>X：<input type="text" v-model="currentClick.left"></P>
      <P>Y：<input type="text" v-model="currentClick.top"></P>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      currentClick: {},
      imgItem: [],
      devItem: [{
        id: '1',
        show: false
      }, {
        id: '2',
        show: false
      }, {
        id: '3',
        show: false
      }, {
        id: '4',
        show: false
      }],
      dragType: '',
      currentMove: '',
      currentDrag: '',
      disx: '',
      disy: ''
    }
  },
  components: {},
  methods: {
    drag (index, ev) {
      console.log('drag')
      this.dragType = 'in'
      this.currentDrag = index
      ev.dataTransfer.setData('Text', ev.target.textContent)
    },
    itemDrag (index, ev) {
      this.dragType = 'move'
      this.currentMove = index
      // ev.clientX - this.offsetLeft
      console.log('itemDrag', ev)
    },
    itemDragEnd (ev) {
      this.disx = ev.pageX - ev.target.offsetLeft
      this.disy = ev.pageY - ev.target.offsetTop
      // console.log('itemDragEnd', ev, this.disx, this.disy)
    },
    itemClick (index, ev) {
      this.currentClick = this.imgItem[index].style
    },
    drop (ev) {
      console.log('drop', ev)
      ev.preventDefault()
      if (this.dragType === 'in') {
        var data = ev.dataTransfer.getData('Text')
        this.imgItem.push({
          text: data,
          style: {
            top: ev.offsetY + 'px',
            left: ev.offsetX + 'px',
            width: '50px',
            height: '50px'
            // position: 'absolute'
          }
        })
        this.devItem[this.currentDrag].show = true
      }
      if (this.dragType === 'move') {
        this.imgItem[this.currentMove].style.top = ev.offsetY + 'px'
        this.imgItem[this.currentMove].style.left = ev.offsetX + 'px'
      }
    },
    allowDrop (ev) {
      console.log('allowDrop')
      ev.preventDefault()
    }
  }
}
</script>

<style lang="stylus" scoped>
.home{
  display flex
  align-items center
  justify-content space-around
  position relative
}
.dragBx{
  display flex
  width 100px
  flex-wrap wrap
  .dragItem{
    width 50px
    height 50px
  }
}
.dragContent{
  width 500px
  height 500px
  border 1px solid #f07c82
  .dragContent-item{
    cursor move
    position absolute
  }
}
</style>
