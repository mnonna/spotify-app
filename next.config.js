const path = require('path')
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'i.scdn.co',
      't.scdn.co',
      'charts-images.scdn.co'
    ],
  },
}