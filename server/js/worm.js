var http = require('http')
var cheerio = require('cheerio')
var fs = require('fs')

var url = 'http://www.daoway.cn/'
var pro = null

function getImg(url) {
  return pro = new Promise(resolve => {
  http.get(url, res => {
    var bufArr = []
    var bigBuf = null

      res.on('data', chunck => {
        bufArr.push(chunck)
      })
      res.on('end', () => {
        bigBuf = Buffer.concat(bufArr)
        var $ = cheerio.load(bigBuf)
        var imgs = $('img')
        resolve(imgs)
      })
    })
  })
}
getImg(url).then(list => {
  var urlList = []
  for (var i = 0; i < list.length; i++) {
    urlList.push('http://www.daoway.cn/'+list[i].attribs.src)
  }
  console.log(JSON.stringify(urlList))
  fs.writeFile('url.json', JSON.stringify(urlList), e=>{
    if(e)throw (e)
    console.log('done')
  })
})


/*
var src = 'aa.png'

console.log(reg.test(src))
console.log(RegExp.$1)
*/
