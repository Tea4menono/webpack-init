var path=require("path");
var htmlWebpackPlugin=require("html-webpack-plugin");
var VueLoaderPlugin=require("vue-loader/lib/plugin");
const  {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer');

module.exports={
    //入口文件
    entry:path.join(__dirname,"./src/main.js"),
    output:{
        path:path.join(__dirname,"./dist"),
        filename:"bundle.js"
    },
    devServer: {
        proxy: {
            // '/big-screen': 'http://172.16.0.55:5000',
            // '/big-screen': 'http://172.28.11.181:5000',
          }
    },

    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,"./src/index.html"),
            filename:"index.html"
        }),
        new BundleAnalyzerPlugin(),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[

            // 配置babel 来转化高级的es6语法
	        {test:/\.js$/,use:"babel-loader",exclude:/node_modules/},
            
            // 处理样式文件
            {test:/\.css$/,use:["style-loader","css-loader"]},
            {test:/\.less$/,use:["style-loader","css-loader","less-loader"]},
            {test:/\.scss$/,use:["style-loader","css-loader","sass-loader"]},
            // 处理图片
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:[
                {
                    loader: 'file-loader',
                    options: {
                      esModule: false,
                      name: 'images/[name].[ext]'
                    },
                },
            ]},
            
            // 处理字体文件 
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:"url-loader"},
            //从右往左调用哦
            {test:/\.vue$/,use:"vue-loader"},
        ]
    },
    resolve:{
        alias:{
            // "vue$":"vue/dist/vue.js"
        }
    }
}
