fis.match('test.js', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://16.187.145.3:8999/receiver',
    //远端目录
    to: '/etc/nginx/foxcloud/test/'
  })
})