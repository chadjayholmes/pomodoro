<template>
  <div class="timer">
    <div class="timer-text">
      <div class="stopwatch">
        <div class="edit-time">
          <div class="" @click="incrementTime">
            <div class="increment-text">
              +
            </div>
          </div>
          <div class="" @click="decrementTime">
            <div class="increment-text">
              -
            </div>
          </div>
        </div>
        <div>
          {{ displayTime2 }}
        </div>
      </div>
    </div>
    <div class="progress">
      <div class="progress-bar" id="progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%; background-color: green"></div>
    </div>
    <div class="timer-buttons">
      <button v-show="!timeRunning && !timeOut" @click="startTimer" class="play-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="#3f4a60" class="bi bi-play-fill" viewBox="0 0 20 20">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>
      </button>
      <button v-show="timeRunning && !timeOut" @click='pauseTimer' class="pause-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="#3f4a60" class="bi bi-pause-fill" viewBox="0 0 20 20">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
        </svg>
      </button>
      <button @click='resetTimer' class="reset-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="#3f4a60" class="bi bi-arrow-clockwise" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
      </button>
      <button @click="redirectToSummary" class="summary-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="#3f4a60" class="bi bi-pencil-square" viewBox="0 0 20 20">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </button>
    </div>
    <div class="animate__animated animate__bounceIn message" v-show="!timeOut && start" >
      Click play to begin your session timer. Login to access session summaries.
    </div>
    <div class="animate__animated animate__bounceIn message" v-show="!timeOut && !start && timeRunning" >
      Time to focus!
    </div>
    <div class="animate__animated animate__bounceIn message" v-show="!timeOut && !start && !timeRunning" >
      You broke your focus... Hurry back!
    </div>
    <div class="animate__animated animate__bounceIn message" v-show="timeOut" >
      Way to focus!
    </div>
    <div class="animate__animated animate__bounceIn message animate__delay-1s" v-show="timeOut" >
      Click the note icon to summarize your session.
    </div>
  </div>
</template>


<script>
import 'timer-stopwatch'

let Stopwatch = require('timer-stopwatch');
let options = {
  refreshRateMS: 1000,		// How often the clock should be updated
  almostDoneMS: 10000, 	// When counting down - this event will fire with this many milliseconds remaining on the clock
}
// let timer = new Stopwatch(1500000, options)

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pomodoro',
  components: {
  },
  data() {
    return{
      startTime: 1500,
      pausedTime: 1500,
      runningTime: 1500,
      timeRunning: false,
      totalMaxTime: 1500,
      start: true,
      displayedTime: 0,
      timeOut: false,
      timer: new Stopwatch(1500999, options),
      progressPercentage: 100,
    }
  },
  methods: {
    startTimer(){
      this.timeRunning = true;
      this.start = false;
      //
      this.timer.start();
    },
    pauseTimer(){
      this.pausedTime = this.timer.ms/1000;
      this.timer.stop();
      this.pausedTime = this.runningTime;
      this.timeRunning = false;
      this.start = false;
      this.displayedTime = this.pausedTime
      this.setProgress();
    },
    resetTimer(){
      this.timeRunning = false;
      this.start = true;
      this.timeOut = false;
      this.runningTime = this.startTime;
      this.pausedTime = this.startTime;
      this.displayedTime = this.startTime;
      this.timer.reset();
      this.setProgress();
    },
    // async timer() {
    //   if(this.runningTime <= 0){
    //     this.timeOut = true;
    //     this.timeRunning = false;
    //     return;
    //   }
    //   while(this.timeRunning){
    //     this.runningTime = this.time;
    //     this.displayedTime = this.runningTime;
    //     this.setProgress();
    //     // await this.sleep(1000); //TODO: Change this back to 1000 ms after grading
    //     // if(this.timeRunning){
    //     //   this.runningTime--;
    //     //   this.displayedTime = this.runningTime;
    //     //   this.setProgress();
    //     //   if(this.runningTime <= 0){
    //     //     this.timeOut = true;
    //     //     this.timeRunning = false;
    //     //     break;
    //     //   }
    //     // }
    //     if(this.runningTime <= 0){
    //       this.timeOut = true;
    //       this.timeRunning = false;
    //       break;
    //     }
    //   }
    // },
    // sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // },
    redirectToSummary() {
      this.$router.push({
        path: '/Summarize'})
    },
    incrementTime() {
      if(this.totalMaxTime < 3560) {
        this.totalMaxTime = this.totalMaxTime + 60
        this.timer = new Stopwatch((this.totalMaxTime * 1000) + 999, options)
        this.setProgress()
        this.start = true
      }
      else {
        alert('Pomodoro does not support sessions that exceed 60 minutes')
      }
    },
    decrementTime() {
      if(this.totalMaxTime >= 60) {
        this.totalMaxTime -= 60
        this.timer = new Stopwatch((this.totalMaxTime * 1000) + 999, options)
      }
      this.setProgress()
      this.start = true
    },
    setProgress() {
      let progressBar = document.getElementById('progress');
      this.progressPercentage = (this.timer.ms/1000/this.totalMaxTime)*100
      progressBar.style.width = this.progressPercentage + '%'
      if(this.progressPercentage > 66){
        progressBar.style.backgroundColor = 'green'
      }
      if(this.progressPercentage > 20 && this.progressPercentage < 66){
        progressBar.style.backgroundColor = 'yellow'
      }
      if(this.progressPercentage < 20){
        progressBar.style.backgroundColor = 'red'
      }

      if( this.progressPercentage <= 0){
        this.timeOut = true;
        this.timer.stop();
      }
    }
  },
  computed: {
    /*displayTime: function () {
      this.setProgress();
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
    },*/
    displayTime2: function () {
      let minutes = 0;
      let seconds = 0;
      minutes = Math.trunc((this.timer.ms/1000)/60)

      if(this.start){
        seconds = 0;
      }
      else{
        seconds = Math.trunc((this.timer.ms/1000) % 60);
      }

      let myString = ''
      if(minutes < 10){
        myString += '0'
      }
      myString += minutes.toString() + ':'
      if(seconds < 10){
        myString += '0'
      }

      if(this.timer.ms <= this.totalMaxTime * 1000){
        this.setProgress();
      }
      myString += seconds.toString();
      return myString;
    },
    progress: function() {
      return (this.timer.ms / 1000 / this.totalMaxTime) * 100
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
  color: #3f4a60;
}

.timer-buttons{
  padding-bottom: 10px;
  display: flex;
  justify-content: space-around;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  overflow: visible
}

.increment-text {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}


.play-button, .pause-button, .reset-button, .summary-button {
  width: 80px;
  height: 60px;
  padding: 5px;
  color: white;
  background: white;
  border: none;
  cursor: pointer;
  overflow: visible
}

.message {
  font-weight: 600;
  font-size: 24px;
  margin-top: 30px;
  background-color: white;
}

.stopwatch {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 24px;
}

.edit-time {
  flex-direction: column;
  justify-content: center;
}

.increment-text {
  padding-right: 12px;
  font-size: 36px;
}

.progress {
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 45px;
  background-color: lightgrey !important;
}

@media only screen and (max-width: 600px){
  .timer-text{
    font-size: 120px;
  }
  .progress{
    width: 94%;
  }

  .message{
    width: 94%;
    margin-right: auto;
    margin-left: auto;
  }
}

</style>
