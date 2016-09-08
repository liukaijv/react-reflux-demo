# react-reflux-demo

最近学习react、reflux的练手项目，一边学一边写，还不大理解flux……

## 线上演示

[demo](http://115.28.223.2:9000/admin/ "demo")

账号: demo 或者 demo@qq.com

密码: demo

## 本地运行

### 克隆代码，安装依赖

```
clone https://github.com/liukaijv/react-reflux-demo.git someDir

cd someDir

composer install

npm install

```

### 数据库设置

mysql：修改.env文件的数据库配置

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=react-reflux-demo
DB_USERNAME=root
DB_PASSWORD=

```

sqlite：修改config/database.php，使用sqlite

```
'default' => env('DB_CONNECTION', 'sqlite')

// 创建database.sqlite文件
touch database/database.sqlite

```


### 运行

```
// 创建数据库，填充数据
php artisan migrate
php artisan db:seed

// 后台服务
npm run web
//localhost:8000

// 前台测试
npm run dev
// localhost:3000

// 代码生成到public/admin目录
npm run build

```
