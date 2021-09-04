
/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */

const url = encodeURI("http://ddns.cloudslave.cn:8081/7xYty6EbxLfse3tHwBWLjK/上班打卡提醒/速度打卡");
const method = "GET";
const headers = {"Field": "test-header-param"};
const data = {"info": "abc"};

const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
    body: JSON.stringify(data) // Optional.
};

$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    console.log(response.body);
    $notify("上班打卡提醒", "提醒成功", response.body); // Success!
    $done();
}, reason => {
    // reason.error
    $notify("上班打卡提醒", "提醒失败", reason.error); // Error!
    $done();
});
