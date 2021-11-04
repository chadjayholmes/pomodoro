<template>
  <div class="timer">
    <div class="timer-text">
      {{ displayTime }}
    </div>
    <div v-show="timeOut">
      GREAT FOCUS
    </div>
    <div class="timer-buttons">
      <button v-show="!timeRunning && !timeOut" @click="startTimer" class="play-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="black" class="bi bi-play-fill" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>
      </button>
      <button v-show="timeRunning && !timeOut" @click='pauseTimer' class="pause-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="black" class="bi bi-pause-fill" viewBox="0 0 16 16">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
        </svg>
      </button>
      <button v-show="timeOut" @click="redirectToSummary" class="summary-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </button>
      <button @click='resetTimer' class="reset-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="black" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Pomodoro',
  components: {
  },
  data() {
    return{
      startTime: 1500,
      pausedTime: 1500,
      runningTime: 1500,
      timeRunning: false,
      start: true,
      displayedTime: 0,
      timeOut: false,
    }
  },
  methods: {
    startTimer(){
      this.timeRunning = true;
      this.start = false;
      this.timer();
    },
    pauseTimer(){
      this.pausedTime = this.runningTime;
      this.timeRunning = false;
      this.start = false;
      this.displayedTime = this.pausedTime
    },
    resetTimer(){
      this.timeRunning = false;
      this.start = true;
      this.timeOut = false;
      this.runningTime = this.startTime;
      this.pausedTime = this.startTime;
      this.displayedTime = this.startTime;
    },
    async timer() {
      if(this.runningTime <= 0){
        this.timeOut = true;
        this.timeRunning = false;
        return;
      }
      while(this.timeRunning){
        await this.sleep(1000);
        if(this.timeRunning){
          this.runningTime--;
          this.displayedTime = this.runningTime;
          if(this.runningTime <= 0){
            this.timeOut = true;
            this.timeRunning = false;
            break;
          }
        }
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    redirectToSummary() {
      this.$router.push({
        path: '/Summarize'})
    }
  },
  computed: {
    displayTime: function () {
      let minutes = 0;
      let seconds = 0;
      minutes = Math.trunc(this.displayedTime/60)

      if(this.start){
        seconds = 0;
      }
      else{
        seconds = this.displayedTime % 60;
      }

      let myString = ''
      if(minutes < 10){
        myString += '0'
      }
      myString += minutes.toString() + ':'
      if(seconds < 10){
        myString += '0'
      }
      myString += seconds.toString();
      return myString;
    },
  },
  mounted() {
    this.displayedTime = this.startTime;
  }
}
</script>

<style scoped>

.timer-text{
  font-size: 200px;
}

.timer-buttons{
  display: flex;
  justify-content: space-around;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}

.play-button, .pause-button, .reset-button, .summary-button {
  width: 80px;
  height: 60px;
  padding: 5px;
  color: white;
  background: white;
  border: none;
}

</style>