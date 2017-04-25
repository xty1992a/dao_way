var fs = require('fs')
var http = require('http')
// var request = require('request')
var cheerio = require('cheerio')
var urlList = require('./url.json')

// var url = 'http://www.xxbiquge.com/3_3036/5278088.html'
/*

function writer(title, content) {
  fs.writeFile('txt/'+title+'.txt', content, function (e) {
    console.log(e)
  })
}
*/

/*
var fsWriter = fs.createWriteStream('1.txt')
request(url).pipe(fsWriter)

*/

var i = 0

function getPage(url) {

  http.get(url, function (res) {
    var html = ''
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('end', function () {
      i++
      var $ = cheerio.load(html)
      var titil = $('h1').text()
      var str = $('#content').text()
      var str = str.replace(/\s{2,4}/g, '\n ')
      var nextUrl = $('.bottem2').children('a')[2].attribs.href
      var nextUrl = 'http://www.xxbiquge.com' + nextUrl
      writer(titil, str)
      console.log(nextUrl);
      if(i<100){
        getPage(nextUrl)
      }
    })
  })

}

// getPage(url)



function getImg() {
  http.get(urlList[i], function (res) {
    var bufArr = []
    res.on('data', function (chunk) {
      // console.log(Buffer.isBuffer(chunk));
      bufArr.push(chunk)
    })
    res.on('end', function () {
      var bigBuf = Buffer.concat(bufArr)
      fs.writeFile(i+'.jpg', bigBuf, e=>{
        // if(e)throw (e)
        i++
        console.log(`第${i}张下载完成`);
        if(i<urlList.length){
          getImg()
        }
      })
    })
  })
}

getImg()



