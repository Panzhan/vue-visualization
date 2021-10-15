### 文件结构

- src

  - views

    - 模块 1
    - 模块 2
    - ...

  - components 公共组件等
  - layouts 菜单栏，头部
  - utils 工具类文件等
  - api 结构文件 每个模块一个文件
  - router 路由
  - assets 样式 图片等
  - store vuex

公共方法：
1）toast 方法：直接调用 this.toast(text,type) 2) 上传图片组件 UploadImg.vue

--- 域名：
测试环境：
正式环境：


table 组件
<a-table
:columns="columns"
:dataSource="dataSource"
:rowKey="record => record.id"
:pagination="pagination"
@change="handlePageChange" ></a-table>
操作按钮使用<a>标签 两个标签之间用<span class="ant-divider"></span>隔开
.....
route 命名规范
1）path 跟 name 一样，name 不可以重复 子路由的那么采用驼峰命名规则

### 打包 fat 测服

npm run build:fat

### 打包 uat

npm run build:uat

### 打包 生产

npm run build:prod
# Operation-management-Background

运营管理后台
