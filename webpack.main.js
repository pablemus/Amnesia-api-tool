const path=require('path');
const isProd=process.env.NODE_ENV==='production';

module.exports={
  mode:process.env.NODE_ENV||'development',
  target:'electron-main',
  entry:'./src/main/main.js',
  output:{
    path:path.resolve(__dirname,'dist/main'),
    filename:'main.js',
    clean:isProd ? true : false  // ⬅ evita borrar preload.js en dev
  },
  devtool:isProd?false:'source-map',
  node:{__dirname:false,__filename:false}
};
