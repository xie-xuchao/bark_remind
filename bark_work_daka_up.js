/*
bark 提醒事项-上下班打卡提醒

兼容: QuantumultX, Surge4, Loon

************************
QuantumultX 本地脚本配置:
************************

[task_local]
# 贴吧签到
0 9 * * * bark_work_daka.js

*/
var $nobyda = nobyda();
var process = {
  total: 0,
  result: [
    // {
    //     bar:'',
    //     level:0,
    //     exp:0,
    //     errorCode:0,
    //     errorMsg:''
    // }
  ]
};
var url_up = {
  url: "http://ddns.cloudslave.cn:8081/7xYty6EbxLfse3tHwBWLjK/上班打卡提醒/速度打卡",
  headers: {
    "Content-Type": "application/octet-stream",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A366"
  }
};
var url_down = {
  url: "https://tieba.baidu.com/sign/add",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14B100 UCBrowser/10.7.5.650 Mobile"
  },
  body: ""
};

up()

function up() {
   $nobyda.get(url_up, function(error, response, data) {
      if (error) {
        process.result.push({
          bar: bar.forum_name,
          errorCode: 999,
          errorMsg: '接口错误'
        });
        checkIsAllProcessed();
      } else {
       null;
      }
    }) {
    if (error) {
      $nobyda.notify("提醒失败1", "提醒失败2", "提醒失败3");
      return $nobyda.done()
    } else {
       $nobyda.notify("提醒成功1", "提醒成功2", "提醒成功3");
       return $nobyda.done()
      }
}

function nobyda() {
  const isRequest = typeof $request != "undefined"
  const isSurge = typeof $httpClient != "undefined"
  const isQuanX = typeof $task != "undefined"
  const notify = (title, subtitle, message) => {
    if (isQuanX) $notify(title, subtitle, message)
    if (isSurge) $notification.post(title, subtitle, message)
  }
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key)
    if (isSurge) return $persistentStore.write(value, key)
  }
  const read = (key) => {
    if (isQuanX) return $prefs.valueForKey(key)
    if (isSurge) return $persistentStore.read(key)
  }
  const adapterStatus = (response) => {
    if (response) {
      if (response.status) {
        response["statusCode"] = response.status
      } else if (response.statusCode) {
        response["status"] = response.statusCode
      }
    }
    return response
  }
  const get = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = {
        url: options
      }
      options["method"] = "GET"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) $httpClient.get(options, (error, response, body) => {
      callback(error, adapterStatus(response), body)
    })
  }
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = {
        url: options
      }
      options["method"] = "POST"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) {
      $httpClient.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body)
      })
    }
  }
  const done = (value = {}) => {
    if (isQuanX) return $done(value)
    if (isSurge) isRequest ? $done(value) : $done()
  }
  return {
    isRequest,
    notify,
    write,
    read,
    get,
    post,
    done
  }
};
