const { app, BrowserWindow, Notification, ipcMain, Menu } = require('electron');
const path = require('path')

// 热加载
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  // hardResetMethod: 'exit'
});

// 创建窗口
const createWindow = () => {
  // null值取消顶部菜单栏
  Menu.setApplicationMenu(null);

  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false  //  require报错解决
    }
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')
  handleIPC()

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(createWindow)

/**
 * 定时任务工作
 */
function handleIPC() {
  ipcMain.handle('work-notification', async() => {
    let res = await new Promise((resolve, reject) => {
      let notification = new Notification({
        title: '任务结束',
        body: '是否开始休息',
        actions: [{ text: '开始休息', type: 'button' }],
        closeButtonText: '继续工作'
      })
      notification.show()
      notification.on('action', () => {
        resolve('rest')
      })
      notification.on('close', () => {
        resolve('work')
      })
    })
    return res
  })
}