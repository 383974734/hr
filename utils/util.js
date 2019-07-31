const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 网络图片缓存方法封装
 * url: 需要缓存的网络图片url
 * name： 缓存图片名字
 */
function requestImageDownloadFile(url) {
  return new Promise(function (resolve, reject) {
    wx.downloadFile({
      url: url,
      success: res => {
        if (res.statusCode === 200) {
          console.log('图片下载成功' + res.tempFilePath)
          // 第二步: 使用小程序的文件系统，通过小程序的api获取到全局唯一的文件管理器
          const fs = wx.getFileSystemManager()
          //  fs为全局唯一的文件管理器。那么文件管理器的作用是什么，我们可以用来做什么呢？
          //   文件管理器的作用之一就是可以根据临时文件路径，通过saveFile把文件保存到本地缓存.
          fs.saveFile({
            tempFilePath: res.tempFilePath, // 传入一个临时文件路径
            success(res) {
              console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径  
              // 此时图片本地缓存已经完成，res.savedFilePath为本地存储的路径。
              //小程序的本地文件路径标准： {{协议名}}://文件路径
              //协议名在 iOS/Android 客户端为 "wxfile"，在开发者工具上为 "http"，
              //开发者无需关注这个差异，也不应在代码中去硬编码完整文件路径。
              //好了，到此为止，我们已经把图片缓存到本地了，而且我们也得到了本地缓存的路径。
              // 那么我们把本地缓存的路径，通过小程序的数据缓存服务保存下来。
              // 下次打开小程序 首先去缓存中检查是否存在本地文件的缓存路径
              // 如果有，直接image src赋值本地缓存路径。
              //如果没有，则是第一次下载图片，或者用户手动清理缓存造成的。
              wx.setStorageSync(url, res.savedFilePath)
              resolve(res);
            },
            fail: error => {
              reject(error);
            }
          })
        } else {
          console.log('响应失败', res.statusCode)
          reject(error);
        }


      },
      fail: error => {
        reject(error);
      }
    })
  });
}

/*
  封装微信的request
*/
function requestGet(url, data = {}, token, method = "GET") {
  console.log(url);
  console.log(data);
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token,
      },
      success: res => {
        resolve(res);
      },
      fail: error => {
        reject(error);
      }
    })
  });
}

/*
  封装微信的request

  对于 GET 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
对于 POST 方法且 header['content-type'] 为 application/json 的数据，会对数据进行 JSON 序列化
对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
*/
function requestPost(url, data = {}, token, method = "POST") {
  console.log(url);
  console.log(data);
  console.log('token:' + token);
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token,
      },
      success: res => {
        resolve(res);
      },
      fail: error => {
        reject(error);
      }
    })
  });
}

/*
  封装toast提示
*/
function toast(title) {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 600
  })
}

module.exports = {
  formatTime: formatTime,
  requestGet: requestGet,
  requestPost: requestPost,
  requestPostFile: requestPostFile,
  requestImageDownloadFile: requestImageDownloadFile,
  toast: toast,
}



/**
 * 上传图片按钮
 */
function requestPostFile(url, tempFilePaths) {
  console.log("调用了此方法");
  console.log(url);
  console.log(tempFilePaths);
  
  return new Promise(function (resolve, reject) {
    //这里是上传操作
    wx.uploadFile({
      url: url, //里面填写你的上传图片服务器API接口的路径 
      filePath: tempFilePaths,//要上传文件资源的路径 String类型 
      name: 'file',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)


      header: {
        "Content-Type": "multipart/form-data"//记得设置
      },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('ssession_token')
      },

      success: res => {
        resolve(res);
      },
      fail: error => {
        reject(error);
      }
    })
  });
}