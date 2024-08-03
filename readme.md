# 介绍
## 1.Monorepo 项目
Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。Monorepo 提倡了开放、透明、共享的组织文化，这种方法已经被很多大型公司广泛使用，如 Google、Facebook 和 Microsoft 等。

## 2.提升开发效率
### Monorepo项目之使用Turborepo的使用
单个项目注意事项，带package.json需带name和version
```
  "name": "my-app",
  "version": "0.1.0",
```

打包效率
```
blog-2020
默认打包：7.44s 8.07s

with-turbopack
默认打包：22.75s. 24.07s.

Turborepo
两个空项目，不使用缓存默认时间：27.986s  26.915s
```
常用命令
```
npm run build -w .\apps\blog-2020\


单个启动
yarn workspace my-app start

单个打包
yarn workspace my-app build

单个依赖添加
yarn workspace my-app add jquery -D
```

yarn 版本1.22.22 
```
体验不好

不要升级
不要升级
不要升级
```

机器配置

```
处理器	Intel(R) Core(TM) i7-4710HQ CPU @ 2.50GHz   2.50 GHz
机带 RAM	7.89 GB
```

### 删除命令rimraf的使用
删除的快快快
```
npm remove rimraf -g

npm install rimraf -g

rimraf node_modules
```

npm install npm i webpack-dev-middleware@5.3.4  -w  apps/turf-www