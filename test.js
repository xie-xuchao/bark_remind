
/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */
var url = "";
var date = new Date();
var timeString = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+((date.getMinutes()<10)?('0'+date.getMinutes()):date.getMinutes());  
var title = timeString + "  上班打卡提醒/";
var content = "，速度打卡"
const urlList = [
{name:"xxc",urll:"http://ddns.cloudslave.cn:8081/7xYty6EbxLfse3tHwBWLjK/"},
{name:"zmx",urll:"http://ddns.cloudslave.cn:8081/7xYty6EbxLfse3tHwBWLjK/"}
];

const method = "GET";
const headers = {"Field": "test-header-param"};
const data = {"info": "abc"};

for(var i=0,l=urlList.length;i<l;i++){
url = urlList[i].urll + title + urlList[i].name + content;
const myRequest = {
    url: encodeURI(url),
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
})
};
