
# TypeScript Node Starter

[![Dependency Status](https://david-dm.org/Microsoft/TypeScript-Node-Starter.svg)](https://david-dm.org/Microsoft/TypeScript-Node-Starter) [![Build Status](https://travis-ci.org/Microsoft/TypeScript-Node-Starter.svg?branch=master)](https://travis-ci.org/Microsoft/TypeScript-Node-Starter)

**现场演示**: <https://typescript-node-starter.azurewebsites.net/>

![image](https://user-images.githubusercontent.com/820883/36764267-abbdb7f8-1be0-11e8-9678-2a9ea448d7f8.png)

此存储库的主要目的是，展示一个良好的端到端项目设置和工作流程，以便用 TypeScript 编写 Node 代码. 我将尽可能保持最新， 但鼓励 社区贡献和改进建议，都非常欢迎.

# 预备

要在本地 构建和运行 此应用程序，您将需要一些东西:

- 安装[Node.js](https://nodejs.org/en/)
- 安装[MongoDB](https://docs.mongodb.com/manual/installation/)
- 安装[VS Code](https://code.visualstudio.com/)

# 入门

- Clone 此存储库

```bash
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
```

- 安装依赖项

```sh
    cd <project_name>
    npm install
```

- 配置您的 mongoDB 服务器

```bash
# 创建 db目录
sudo mkdir -p /data/db
# 给 db 正确的读/写权限
sudo chmod 777 /data/db
```

- 启动你的 mongoDB 服务器 (你可能想要另一个命令提示符)

```
    mongod
```

- 构建并运行项目

```
    npm run build
    npm start
```

或者，如果您使用的是 VS Code，则可以使用`cmd + shift + b`运行默认构建任务 (映射到`npm run build`) ，然后你可以使用 命令调色板 (`cmd + shift + p`) 并选择`Tasks: Run Task`>`npm: start` ，来帮你使用`npm start`.

> **关于编辑器的注意事项!**- TypeScript 对[每个编辑器](http://www.typescriptlang.org/index.html#download-links)都非常支持， 但此项目已预配置使用[VS Code](https://code.visualstudio.com/). 下面，我将尝试挖掘 VS Code 的发光处，或者 功能特性的优势.

最后，导航到`http://localhost:3000`，你应该看到在本地 提供和呈现 的模板!

# 部署应用程序

有许多方法可以部署 Node 应用程序，一般而言，尽管您使用的是 TypeScript，但部署过程不会发生任何变化. 在本节中，我将向您介绍如何使用 VS Code 中提供的扩展 将 此应用程序 部署到 Azure App Service，因为我认为这是最简单，最快速的入门方式，以及 是开发人员最友好的工作流程光景了.

## 预备工作

- [**Azure 账号**](https://azure.microsoft.com/en-us/free/)- 如果您没有，可以免费注册. Azure 免费套餐为您提供了大量资源，包括最多 10 个 App Service 实例，这就是我们将要使用的实例.

> 一般， 中国大陆用户若没有`Visa 和 MasterCard`信用卡，是注册不了的 _2018 7.24_ ，那么你可以想直接跳到 [TypeScript 与 Node](#typescript--node)

- [**VS Code**](https://code.visualstudio.com/)- 我们将使用 VS Code 提供的界面来快速部署我们的应用程序.
- [**Azure App Service VS Code 扩展**](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)- 在 VS Code 中，在扩展市场中 (最左侧菜单栏上的第 5 个按钮) 搜索`Azure App Service` ，安装扩展，然后重新加载 VS Code.
- **创建云数据库**- 对于本地开发，在 本机上 可以很好运行 MongoDB ，但是一旦部署，我们需要一个具有高可用性的数据库. 实现此目的的最简单方法是使用托管云数据库. 有许多不同的提供商，但最容易上手的是[MongoLab](#mlab).

### <a name="mlab"></a> 使用 MongoLab 创建 托管的 MongoDB

1.  导航[MongoLab's Website](https://mlab.com/)，注册一个免费帐户，然后登录.
2.  在里面 **MongoDB 部署**部分，单击 **创建新的**按钮.
3.  选择任何提供商 (我推荐 **Microsoft Azure**因为它提供了一种更简单的方法来升级到全球分布式实例.

4.  选择**Sandbox**保持自由，除非你知道你在做什么，然后点击 **继续**.

5.  选择一个地区 (我建议地理位置最接近您应用用户的地区) .

6.  添加名称，单击**继续**再次，最后**提交订单**.

7.  创建新数据库后，从中选择它**MongoDB Deployments**部分.

8.  选择创建用户**用户**选项卡，单击**添加数据库用户**按钮，添加用户名和密码，然后单击**创建**. 连接到数据库需要用户帐户，因此请记住这些值，因为您需要将它们作为连接字符串的一部分.

9.  从页面顶部复制连接字符串，它应如下所示: `mongodb://<dbuser>:<dbpassword>@ds036069.mlab.com:36069/test-asdf`并替换`<dbUser>`和`<dbpassword>`使用您刚刚创建的凭据. 回到你的项目中，打开你的`.env`文件和更新`MONGODB_URI`使用新的连接字符串.

> 注意！ - 如果你还没有`.env`文件，请将`.env.example`重命名为`.env`并按照注释更新该文件中的值

10. **成功!** 您可以通过更新`MONGODB_URI_LOCAL`到 您刚刚更新的相同连接字符串`MONGO_URI`，来测试它是否在本地工作. 在 重建/服务中 后，应用程序应该可以工作，但以前在本地测试中创建的用户将不会存在于新数据库中! 别忘了归还`MONGO_URI_LOCAL`到你当地的测试数据库 (如果你愿意的话) .

## 部署到 Azure App Service

从 VS Code 部署 可以分为以下步骤:

1. 在 VS Code 中验证您的 Azure 帐户

2. 构建您的应用程序

3. 使用 Azure App Service 扩展进行 Zip压缩 部署

### 登录您的 Azure 帐户

1.  打开 VS Code

2.  展开资源管理器菜单中的 Azure App Service 菜单
    - 如果你没有看到这个，你可能没有
    - 扩展安装. `Azure App Service`请参阅 预备工作 部分.
3.  点击`Sign in to Azure...`
4.  选择`Copy & Open`从结果对话框中
    - 这将打开`aka.ms/devicelogin`在浏览器窗口中. 如果没有，只需手动导航即可.
5.  粘贴到剪贴板上的代码中.
6.  回到 VS Code，您现在应该已登录. 您可以通过浏览器窗口的 Azure App Service 部分中，列出的 Azure 订阅 来确认一切正常. 此外，您应该会在 VS Code 底部的状态栏中看到与您的帐户关联的电子邮件.

### 构建应用程序

在 zip部署 之前，需要在本地构建应用程序，因为 App Service 不会执行构建任务.

按照通常的方式构建应用程序: - 启动 VS Code 中的默认构建

- `ctrl + shift + b`执行
- 从终端窗口`npm run build`

### 从 VS Code 进行 Zip部署

1. 确保您的应用已构建，您目前`node_modules`和`dist`文件夹将是部署的应用程序.

2. 单击资源管理器窗口的 Azure App Service 部分上的蓝色向上箭头 (Deploy to Web App) .
3. 选择整个项目目录. 如果您还没有更改名称，这将是`TypeScript-Node-Starter`

4. 选择您想要将此应用程序付费的订阅 (不用担心，它将是免费的) 呵呵.

5. 选择 `Create New Web App`

6. 输入一个全球唯一的名称 - 这将是 azure 生成的 URL 的一部分，因此它必须是唯一的，但如果您计划稍后添加自定义域，那它并不重要.我通常只是在应用名称的末尾添加随机数，例: typescript-node-starter-15121214.

7. 选择资源组 - 如果您不知道这是什么，只需创建一个新资源. 如果您有许多云资源应该在逻辑上组合在一起 (想想应用程序服务和支持该应用程序的数据库) ，那么您可能希望将它们放在同一个资源组中. 这可以随后更新. 如果您创建新资源组，系统还会提示您为该组选择一个位置. 选择地理位置靠近用户所在位置的地方.

8. 选择`Create new App Service Plan`- 应用服务计划主要决定您的应用运行硬件的大小和成本，但它还管理一些我们现在可以忽略的其他设置.

9. 选择`B1 - Basic`这个是免费的. 如果您知道自己在做什么，请随意选择更强的定价等级.

10. 选择目标 Node 版本 - 我们正在部署到 Linux 机器，此外我们可以选择我们想要的确切 Node. 如果您不知道自己想要什么，请选择当前 LTS 构建的内容.

11. 拿一杯咖啡 - 你会看到你刚刚选择的所有东西都在输出窗口中创建. 所有这一切都是由[Azure CLI](https://docs.microsoft.com/en-us/cli/azure/overview?view=azure-cli-latest)，如果您决定要自定义此过程，可以自行复刻. 此部署不是最快的选择 (但它是最简单的!) .我们实际上 捆绑了项目中的所有内容 (包括大量的 node_modules 文件夹) 并将其上传到我们的 Azure 应用服务中. 时间会有所不同，但作为基准，我的部署大约需要 6 分钟.

12. 添加`NODE_ENV`环境变量 - 在资源管理器窗口的"应用程序服务"部分中，展开新创建的服务，右键单击 **应用程序设置**， 选择 **添加新设置...**，并添加`NODE_ENV:production`.
    此设置确定要指向的数据库. 如果您尚未创建云数据库，请参阅[安装指南](#mlab).
13. 好了! 如果一切正常，您应该看到如下所示的页面: [TypeScript Node Starter Demo Site](https://typescript-node-starter.azurewebsites.net/)

### 排除故障部署

部署可能由于各种原因而失败，如果您遇到一个说明的页面*暂停服务*或其他一些错误，[打开 issue](https://github.com/Microsoft/TypeScript-Node-Starter/issues/new)，我会尽力帮你解决问题.

# TypeScript + Node

在接下来的几节中，我将展示将 TypeScript 添加到 Express 项目后发生的所有变化. 请注意，所有这些都已经为此项目设置好了，但可以将其用作 Node.js 项目转换为 TypeScript 的参考.

## 获取 TypeScript

TypeScript 本身很容易添加到任何项目中`npm`.

```
    npm install -D typescript
```

如果你正在使用 VS Code 那么你很高兴! VS Code 将检测并使用您安装在`node_modules`中的 TypeScript 版本. 对于其他编辑器，请确保您有相应的编辑器的[TypeScript 插件](http://www.typescriptlang.org/index.html#download-links).

## 项目结构

TypeScript + Node 项目 中最明显的区别是 文件夹结构. 在 TypeScript 项目中，最好分开*源-source*和 *分配-dist*文件. TypeScript (`.ts`) 文件住在你的`src`文件夹，然后编译输出为 JavaScript (`.js`) 在`dist`里面. 该`test`和`views`文件夹按预期保持最高水平.

此应用程序的完整文件夹结构解释如下:

> **注意!** 确保您已经使用`npm run build`构建了应用程序

| 名称                 | 描述                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **.vscode**          | 包含 VS Code 特定设置                                                                                                                         |
| **dist**             | 包含 TypeScript 构建中的可分发 (或输出) . 这是您发布的代码                                                                                    |
| **node_modules**     | 包含所有 npm 依赖项                                                                                                                           |
| **src**              | 包含将编译到 dist 目录的源代码                                                                                                                |
| **src/config**       | Passport 身份验证策略和登录中间件. 在此添加其他复杂的配置代码                                                                                 |
| **src/controllers**  | 控制器定义响应各种 http 请求的函数                                                                                                            |
| **src/models**       | 模型定义 Mongoose 模式，用于存储和检索 MongoDB 中的数据                                                                                        |
| **src/public**       | 将在客户端使用的静态资产                                                                                                                      |
| **src/types**        | 保留在 DefinitelyTyped 上找不到的.d.ts 文件. 在此更多地涵盖[section](#%E7%B1%BB%E5%9E%8B%E5%AE%9A%E4%B9%89-dts-%E6%96%87%E4%BB%B6)            |
| **src**/server.ts    | 进入快递应用的入口点                                                                                                                          |
| **test**             | 包含您的测试. 从源代码中分离，因为存在不同的构建过程.                                                                                          |
| **views**            | 视图定义您的应用在客户端上的呈现方式. 在这种情况下，我们正在使用 pug                                                                           |
| .env.example         | API 密钥，令牌，密码，数据库 URI. 克隆这个，但不要签它到公共回购.                                                                               |
| .travis.yml          | 用于配置 Travis CI 构建                                                                                                                       |
| .copyStaticAssets.ts | 构建将图像，字体和 JS 库复制到 dist 文件夹的脚本                                                                                               |
| jest.config.js       | 用于配置 Jest                                                                                                                                 |
|  package.json      | 包含 npm 依赖项的文件以及[build scripts](#%E5%A6%82%E6%9E%9C%E5%BA%93%E4%B8%8D%E5%9C%A8-definitelytyped-%E4%B8%8A%E6%80%8E%E4%B9%88%E5%8A%9E) |
| tsconfig.json        | 配置用于编译用 TypeScript 编写的服务器代码的设置                                                                                              |
| tsconfig.tests.json  | 配置用于编译用 TypeScript 编写的测试的设置                                                                                                    |
| tslint.json          | 配置 TSLint 代码样式检查的设置                                                                                                                |

## 建立项目

现在很少有 JavaScript 项目 没有某种构建管道，但是 Node 项目通常具有最少量的构建配置. 因此，我试图尽可能简化构建. 如果您担心编译时间，主要监视任务需要 大约 2 秒 才能刷新.

### 配置 TypeScript 编译

TypeScript 使用该文件`tsconfig.json`调整项目编译选项. 让我们剖析一下这个`tsconfig.json`，从`compilerOptions`开始详细介绍如何编译项目.

```json
    "compilerOptions": {
        "module": "commonjs"，
        "esModuleInterop": true，
        "target": "es6"，
        "noImplicitAny": true，
        "moduleResolution": "node"，
        "sourceMap": true，
        "outDir": "dist"，
        "baseUrl": "."，
        "paths": {
            "*": [
                "node_modules/*"，
                "src/types/*"
            ]
        }
    }，
```

| `compilerOptions`            | 描述                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `"module": "commonjs"`       | 该**输出**模块类型 (在你的`.js`文件) . Node 使用 commonjs，这就是我们使用的                                                         |
| `"esModuleInterop": true，`   | 允许使用备用模块导入语法: `import foo from 'foo';`                                                                                 |
| `"target": "es6"`            | 输出语言级别. Node 支持 ES6，所以我们可以在这里定位                                                                                 |
| `"noImplicitAny": true`      | 启用更严格的设置，当某些内容出现默认`any`值设置时会抛出错误                                                                         |
| `"moduleResolution": "node"` | TypeScript 尝试模仿 Node 的模块解析策略. 阅读更多 [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node) |
| `"sourceMap": true`          | 我们希望在我们的 JavaScript 旁边输出源映射.见[调试](#调试)部分                                                           |
| `"outDir": "dist"`           | 编译后的`.js`文件输出位置.                                                                                           |
| `"baseUrl": "."`             | 配置模块处理的一部分. 查看[路径映射章节](#%E4%BB%8E-definitelytyped-%E5%AE%89%E8%A3%85dts))                                      |
| `paths: {...}`               | 配置模块处理的一部分. 查看 [路径映射章节](#%E4%BB%8E-definitelytyped-%E5%AE%89%E8%A3%85dts))                    |

文件的其余部分定义TypeScript项目上下文，项目上下文基本上是一组选项，用于确定在编译器使用时会编译 哪些文件，由`tsconfig.json`指定. 在这种情况下，我们使用以下内容，来定义项目上下文: .

```json
    "include": [
        "src/**/*"
    ]
```

`include`是一组 glob 模式的文件，旨被包含在编译中，这个项目非常简单，所有的`.ts` 文件都在`src`. 对于更复杂的设置，您可以`exclude`一组 glob 模式，用于从定义的`include`集合中删除特定文件. 还有一个选项`files`，它采用一组能覆盖`exclude`和`include`的单个文件名.

### 运行构建

所有不同的构建步骤都是通过[npm scripts](https://docs.npmjs.com/misc/scripts)编排协调的. Npm 脚本基本上允许我们通过 npm 调用 (和链接) 终端命令. 这很好，因为大多数 JavaScript 工具都有易于使用的命令行实用程序，使我们不需要`grunt或gulp`来管理我们的构建. 如果你打开`package.json`，你会看到一个包含您可以调用的所有不同脚本的`scripts`部分. 要调用脚本，只需运行`npm run <script-name>`即可从命令行. 您会注意到 npm 脚本可以相互调用，这使得从简单的单个构建脚本中组合复杂的构建变得容易. 以下是此模板可用的所有脚本的列表:

| 描述                 | 与'npm run serve'相同.                                                               |
| -------------------- | ------------------------------------------------------------------------------------ |
| `start`              | 可以调用`npm start`                                                                  |
| `build`              | 完整的构建. 运行所有构建任务 (`build-sass`，`build-ts`，`tslint`，`copy-static-assets`) |
| `serve`              | 运行node`dist/server.js`这是应用入口点                                               |
| `watch-node`         | 使用 nodemon 运行node，以便在崩溃时进程重新启动. 用于主要监视任务                     |
| `watch`              | 运行所有监视任务 (TypeScript，Sass，Node) . 如果您没有触及静态资产，请使用此选项.       |
| `test`               | 使用 Jest 测试运行器运行测试                                                         |
| `watch-test`         | 在watch模式下运行测试                                                                 |
| `build-ts`           | 编译所有源`.ts`文件到`dist`中的`.js`文件                                         |
| `watch-ts`           | 与`build-ts`一样但不断观察`.ts`文件，并在需要时重新编译                             |
| `build-sass`         | 编译所有`.scss`文件到`.css`文件                                                        |
| `watch-sass`         | 与`build-sass`一样但不断观察`.scss`文件，并在需要时重新编译                         |
| `tslint`             | 在项目文件上运行 TSLint                                                              |
| `copy-static-assets` | 调用将 Js 库，字体和图像复制到 dist 目录的脚本                                        |
| `debug`              | 执行完整版本，然后以观察模式提供应用程序                                              |
| `serve-debug`        | 使用--inspect 标志运行应用程序                                                       |
| `watch-debug`        | 同样的`watch`但包括--inspect 标志，以便您可以附加调试器                               |

## 类型定义 (`.d.ts`) 文件

TypeScript 使用`.d.ts`文件，提供没用 TypeScript 编写的 JavaScript 库类型. 这很棒，因为一旦你有了`.d.ts`文件，TypeScript 可以检查该库类型，并在编辑器中为您提供更好的帮助. TypeScript 社区主动分享所有最新的`.d.ts`，这 GitHub 存储库的流行库为[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types). 确保你的`.d.ts`文件正确设置非常重要，因为一旦它们到位，您就可以免费获得大量高质量的类型检查 (以及错误捕获，IntelliSense 和 其他编辑器工具) .

> **注意!** 因为我们正在使用`"noImplicitAny": true`，我们要求我们使用的 **一切** 库都有一个`.d.ts` . 虽然你可以设置`noImplicitAny`至`false`沉默了关于`.d.ts`文件失踪错误. 但最好的做法是每个库都有`.d.ts`文件. (即使是`.d.ts`文件是[基本 没有!](#%E5%86%99%E4%B8%80%E4%B8%AAdts%E6%96%87%E4%BB%B6)

### 从 DefinitelyTyped 安装`.d.ts`

在大多数情况下，在 DefinitelyTyped 上你会发现您使用库的`.d.ts`文件. 这些`.d.ts`使用`@types`可以轻松安装到项目中. 例如，如果我们想要 jQuery 的`.d.ts`，我们可以这样做`npm install --save-dev @types/jquery`.

> **注意!**一定要添加`--save-dev` (要么`-D`) 到你的`npm install`. `.d.ts`文件是项目依赖项，但仅在编译时使用，因此应该是 dev 依赖项.

在这个模板中，所有的`.d.ts`文件已添加到`package.json`中的`devDependencies`字段，这样你就可以在运行`npm install`后能获得所需的一切. 一旦`.d.ts`文件已经安装，它们会在`node_modules/@types`. 当 解析 JavaScript 库文件时，编译器将始终在此文件夹中查找`.d.ts`.

### 如果库不在 DefinitelyTyped 上怎么办?

如果您尝试安装来自`@types`的`.d.ts`文件但找不到它，或者您检查 DefinitelyTyped 但找不到特定的库，您将需要创建自己的`.d.ts`在`src`，你会找到`types`文件夹有`.d.ts`却不在 DefinitelyTyped 上 (或者在撰写本文时尚未出现) .

#### 设置 TypeScript 要查找的`.d.ts`是在另一个文件夹中

默认情况下, 编译器知道要查看`node_modules/@types`，为了可以帮助编译器找到我们自己的`.d.ts`，我们必须在`tsconfig.json`中配置路径映射. 路径映射可能会让人感到困惑， 但基本思路是 TypeScript 编译器 在 解析模块时 会按 特定顺序 查看 特定位置，并且我们能够告诉编译器确切的操作方法. 此项目`tsconfig.json`中，你会看到以下内容:

```json
"baseUrl": "."，
"paths": {
    "*": [
        "node_modules/*"，
        "src/types/*"
    ]
}
```

这告诉 TypeScript 编译器，每次进来 (`*`) 除了查看`node_modules/@types`，也看我们自己`.d.ts`文件位置`<baseUrl>`+`src/types/*`. 所以当我们写下这样的东西:

```ts
import * as flash from 'express-flash';
```

首先，编译器将寻找一个`d.ts`在`node_modules/@types`，然后当它没有找到，它又看`src/types`, 并找到我们的文件`express-flash.d.ts`.

#### 使用`dts-gen`

除非你熟悉`.d.ts`文件，我强烈建议尝试使用该[dts-gen](https://github.com/Microsoft/dts-gen)先. [README](https://github.com/Microsoft/dts-gen#dts-gen-a-typescript-definition-file-generator)很好地解释了如何使用该工具，并且在大多数情况下，您将获得一个优秀的`.d.ts`模版文件作为开头. 在这个项目中，`bcrypt-nodejs.d.ts`，`fbgraph.d.ts`，和`lusca.d.ts`都是使用`dts-gen`生成的.

#### 写一个`.d.ts`文件

如果使用`dts-gen`不能生成一个`.d.ts`，[那么你应该告诉我](https://www.surveymonkey.com/r/LN2CV82)，但是你可以创建自己的`.d.ts`文件.

当然，若您只想暂时使编译器静音，请创建一个名为`<some-library>.d.ts`文件，在你的`types`文件夹，和添加以下代码行:

```ts
declare module '<some-library>';
```

如果你想投入一些时间来创造一个伟大的`.d.ts`文件，将为您提供出色的 类型检查和 智能提示，TypeScript 网站有非常棒的[`.d.ts`写作文档](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

#### 贡献 DefinitelyTyped

它很容易变得很棒的原因，是大多数库的`.d.ts`文件有像你这样的开发人员，将他们的工作贡献给 DefinitelyTyped. 贡献`.d.ts`文件是进入开源社区的好方法，如果它是您以前从未尝试过的东西，并且只要您的更改被接受，世界上的每个其他开发人员都可以访问您的工作. 

如果你有兴趣试一试，请查看[DefinitelyTyped 入门](https://github.com/definitelyTyped/DefinitelyTyped/#how-can-i-contribute)
如果你不感兴趣，[你可以告诉 why](https://www.surveymonkey.com/r/LN2CV82)，以此我们可以帮助将来更轻松!

### 管理`.d.ts`的总结

一般来说，如果你坚持以下步骤，你只有最小的`.d.ts`问题;

1. 在安装任何 npm 软件包 作为 依赖项或 dev 依赖项 后，立即尝试安装`.d.ts`通过`@types`

2. 如果 库 在 DefinitelyTyped 上有`.d.ts`，安装将成功，你就完成了
   如果由于程序包不存在而导致安装失败，请继续执行步骤 3.

3. 确保项目是具有[提供你自定义 `d.ts`文件的配置](#%E8%AE%BE%E7%BD%AEtypescript-%E8%A6%81%E6%9F%A5%E6%89%BE%E7%9A%84dts%E6%98%AF%E5%9C%A8%E5%8F%A6%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6%E5%A4%B9%E4%B8%AD).

4. 尝试 [用 dts-gen 生成 `.d.ts`](#%E4%BD%BF%E7%94%A8dts-gen)
   如果成功，你就完成了. 如果没有，请继续执行步骤 5.

5. 创建一个名为`<some-library>.d.ts`的文件在你的`types`文件夹.

6. 添加以下代码:

```ts
declare module '<some-library>';
```

7.  此时，所有内容都应该编译而没有错误，您可以改进`.d.ts`中的类型按照[写作 `.d.ts` 文档](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)或 继续没有类型.

8.  如果您仍然遇到问题，请通过发送电子邮件或在 Twitter 上告诉我，我会帮助您.

## 调试

调试 TypeScript 就像 调试 JavaScript 一样，但有个警告，你需要源映射.

### 源映射

源映射允许您在 TypeScript 源代码 中断点，当 运行时正在执行到的 JavaScript，命中该断点，

> **注意!** - 源映射不是TypeScript 特有的

任何时候 JavaScript 都被转换 (转换，编译，优化，缩小等) ，你都需要源映射，以便在运行执行的代码时可以*映射*回到生成它的源头.

源映射的最好的地方是在你正确配置后，您甚至不知道它们存在! 那么让我们来看看我们在这个项目中如何做到这一点.

#### 配置源映射

首先，你需要确保你的已启用源地图生成: `tsconfig.json`

```json
"compilerOptions" {
    "sourceMap": true
}
```

启用此选项后，TypeScript 编译器输出一个`.js`文件，同时输出一个`.map.js`.这个`.map.js`提供调试时映射回源`.ts`文件.

> **注意!**. - 也可以生成"内联-inline"源映射，通过`"inlineSourceMap": true`

这在编写客户端代码时更常见，因为某些捆绑器需要 内联源映射 来保留捆绑的映射. 因为我们正在编写 Node.js 代码，所以我们不必担心这一点.

### 在 VS Code 中使用调试器

调试是 VS Code 真正优于其他编辑器的地方之一.

VS Code 中的 Node.js 调试很容易设置，甚至更容易使用. 该项目预先配置了 您开始使用 所需的一切.

当你在 VS Code 中点击`F5`，它寻找顶级`.vscode`文件夹的`launch.json`文件. 在此文件中，您可以准确地告诉 VS Code 您要执行的操作:

```json
{
  "type": "node"，
  "request": "attach"，
  "name": "Attach by Process ID"，
  "processId": "${command:PickProcess}"，
  "protocol": "inspector"
}
```

这与"Node.js: Attach by Process ID"模板大致相同，只有一个小的更改.

我们补充`"protocol": "inspector"`，告诉 VS Code 我们正在使用最新版本的 Node，它使用新的调试协议.

有了这个文件，你可以点击`F5`去启动附加调试器. 您可能会运行多个node进程，因此您需要找到显示`node dist/server.js`的进程. 现在只需设置断点即可!

## 测试

对于这个项目，我选择了[Jest](https://facebook.github.io/jest/)

作为我们的测试框架. 虽然 Mocha 可能更常见，但 Mocha 似乎正在寻找新的维护者，并且在 Jest 中设置 TypeScript 测试 很简单.

### 安装组件

要添加 TypeScript + Jest 支持，请先安装几个 npm 包:

```
    npm install -D jest ts-jest
```

`jest`是测试框架本身，和这`ts-jest`只是一个简单的函数，使运行 TypeScript 测试更容易一些.

### 配置 Jest

Jest 的配置存在于`jest.config.js`，让我们打开它并添加以下代码:

```js
module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  }，
  moduleFileExtensions: ['ts'， 'js']，
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
  }，
  testMatch: ['**/test/**/*.test.(ts|js)']，
  testEnvironment: 'node'
};
```

基本上我们告诉 Jest , 我们希望它，使用 模式匹配 `"**/test/**/*.test.(ts|js)"` (所有`.test.ts`/`.test.js`文件在`test`文件夹)，但是我们想先预先处理`.ts`文件。
这个预处理步骤非常灵活，但在我们的例子中，我们只想使用`tsconfig.json`将 TypeScript 编译为 JavaScript。
这一切都发生在运行测试的内存中，因此没有输出`.js`测试文件供您管理。

### 运行测试

简单地`npm run test`请注意，这也将生成覆盖率报告.

### 写测试

Web 应用程序编写测试有 专门的书籍 和 最佳实践 ,这些种种都带有个人风格的强烈影响，所以我故意避免 在本指南中 讨论 如何或何时 编写测试. 但是，如果 测试的说明性指导 是您感兴趣的[let me know](https://www.surveymonkey.com/r/LN2CV82)，我会做一些功课，然后再回复你.

## TSLint

TSLint 是一个代码规范器，主要帮助捕获 次要的代码质量和样式问题. TSLint 与 ESLint 或 JSLint 非常相似，但是在构建时考虑了 TypeScript.

### TSLint 规则

与 大多数规范 一样，TSLint 具有一系列可配置的规则以及对自定义规则集的支持. 所有规则都通过`tslint.json`配置。
在这个项目中，我们使用了一套相当基本的规则，没有其他自定义规则。
这些设置主要基于我们用于 开发 TypeScript 本身 的 TSLint 设置。

### 运行 TSLint

与我们的其他构建步骤一样，我们使用 npm 脚本 来调用 TSLint.要运行 TSLint，您可以调用 主构建脚本 或 仅调用 TSLint 任务.

请注意，TSLint 不是主要监视任务的一部分. 在编写函数的过程中，TSLint 会使 输出窗口混乱，这可能很烦人，因此我选择 仅 在完整构建期间 运行它.

```
    npm run build   // 运行 完整构建, 包括 TSLint
    npm run tslint  // 只运行TSLint
```

如果您有兴趣尽快看到 TSLint 反馈，我强烈推荐[TSLint 扩展 - VS Code]().

### VSCode 扩展

为了在 VSCode 中工作时增强您的开发体验，我们还为您提供了使用此项目的建议扩展列表:

![VSCode 扩展 建议](https://user-images.githubusercontent.com/14539/34583539-6f290a30-f198-11e7-8804-30f40d418e20.png)

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
- [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)

# 依赖

通过`package.json`管理依赖性. 在该文件中，您将找到两个部分:

## `dependencies`

| Package           | 描述                              |
| ----------------- | --------------------------------- |
| async             | 提供异步控制流的实用程序库.       |
| bcrypt-nodejs     | 用于散列和腌制用户密码的库.       |
| bluebird          | Promise 库                        |
| body-parser       | Express 4 中间件.                 |
| compression       | Express 4 中间件.                 |
| connect-mongo     | 用于 Express 的 MongoDB 会话存储. |
| dotenv            | 从.env 文件加载环境变量.          |
| errorhandler      | Express 4 中间件.                 |
| express           | Node.js web 框架.                 |
| express-flash     | 为 Express 提供 Flash 消息.       |
| express-session   | Express 4 中间件.                 |
| express-validator | Express 的简单表单验证.           |
| fbgraph           | Facebook Graph API 库.            |
| lodash            | 通用实用程序库.                   |
| lusca             | CSRF 中间件.                      |
| mongoose          | MongoDB ODM.                      |
| nodemailer        | 用于发送电子邮件的 Node.js 库.    |
| passport          | node.js 的简单而优雅的身份验证库  |
| passport-facebook | 使用 Facebook 插件登录.           |
| passport-local    | 使用用户名和密码插件登录.         |
| pug (jade)        | Express 的模板引擎.               |
| request           | 简化的 HTTP 请求库.               |
| request-promise   | Promisified HTTP 请求库.          |
| winston           | 记录日志库                            |

## `devDependencies`

| Package      | 描述                                                        |
| ------------ | ----------------------------------------------------------- |
| @types       | 此文件夹中的是用于提供类型的`.d.ts`文件               |
| chai         | 测试实用程序库，使编写测试更容易                             |
| concurrently | 管理多个并发任务的实用程序. 与 npm 脚本一起使用             |
| jest         | 测试 JavaScript 的库.                                       |
| node-sass    | 允许将.scss 文件编译为.css                                  |
| nodemon      | 在崩溃时自动重启node进程的实用程序                          |
| supertest    | HTTP 断言库.                                                |
| ts-jest      | 具有源映射支持的预处理器，以帮助使用带有 Jest 的 TypeScript. |
| ts-node      | 允许直接运行 TS 文件. 用来运行`copy-static-assets.ts`         |
| tslint       | TypeScript 文件的 Linter (类似于 ESLint)                    |
| typescript   | JavaScript 编译器/类型检查器，可提高 JavaScript 生产力       |

要安装或更新这些依赖项，您可以使用`npm install`要么`npm update`.

# 黑客马拉松 入门项目

这个快速入门的大部分内容 都是从 Sahat的优秀内容[Hackathon Starter project](https://github.com/sahat/hackathon-starter)中 获得启发或改编 ​的.
