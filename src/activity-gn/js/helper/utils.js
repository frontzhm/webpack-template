 /**
 * [parseURL 解析url]
 * @author zhm
 * @anotherdate 2017-06-12T21:38:22+0800
 * @param       {[type]} url [description]
 * @return      {[type]} [对象格式，query:{},origin:string,host:string]

var x = parseURL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string&query2=string2#hash')
x = {
 query: { query: "string", query2: "string2" },
 origin: "https://sub.host.com:8080",
 pathname: "/p/a/t/h",
 hash: "#hash",
}
 */

function parseURL(url) {
  var parser = document.createElement('a');
  parser.href = url;
  parser.query = {};
  parser.search.replace(/([^?=&]+)=([^?=&]+)/g, function () {
      parser.query[arguments[1]] = arguments[2];
  })
  return {
      // 常用的
      query: parser.query,
      origin: parser.origin,
      pathname: parser.pathname,
      // hash: parser.hash,
      // 不常用的
      // protocol: parser.protocol,
      // username: parser.username,
      // password: parser.password,
      // host: parser.host,
      // port: parser.port,
      // hostname: parser.hostname,
      // search: parser.search,
      // href: parser.href
  }
}

export { parseURL }
