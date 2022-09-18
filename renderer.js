const { ipcRenderer } = require('electron');
const Timer = require('timer.js');
// timer.js开源地址：https://github.com/husa/timer.js

// 定时器初始化
const workTimer = new Timer({
  ontick: (ms) => {
    updateTime(ms)
  },
  onend: () => {
    notification()
  }
})

// 开始工作
const startWork = () => {
  workTimer.start(10)
}
// 停止工作
const endWork = () => {
  workTimer.stop()
}
// 暂停工作
const startRestWork = () => {
  workTimer.pause()
}

/**
 * 更新时间的方法
 */
const updateTime = (ms) => {
  let timerContainer = document.getElementById('time-container');
  console.log('timerContainer',timerContainer);
  
  let s = (ms / 1000).toFixed(0)
  let ss = s % 60
  let mm = (s / 60).toFixed(0)
  timerContainer.innerText = `${ mm.toString().padStart(2, 0) } : ${ ss.toString().padStart(2, 0) }`
}

/**
 * 通知
 */
const notification = async () => {
  let res = await ipcRenderer.invoke('work-notification');
  if(res === 'rest') {
    setTimeout(() => {
      alert('休息')
    }, 5 * 1000)
  } else if(res === 'work'){
    startWord()
  }
}

startWork()

// 开始工作
const startWorkBtn = document.getElementById('startWorkBtn')
startWorkBtn.addEventListener('click', () => {
  startWork()
})
// 结束工作
const endWorkBtn = document.getElementById('startWorkBtn')
endWorkBtn.addEventListener('click', () => {
  endWork()
})
// 开始休息
const startRestBtn = document.getElementById('startWorkBtn')
startRestBtn.addEventListener('click', () => {
  startRestWork()
})
// 结束休息开始工作
const endRestBtn = document.getElementById('startWorkBtn')
endRestBtn.addEventListener('click', () => {
  startWork()
})