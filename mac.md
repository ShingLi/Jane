# mac

## 笔记

+ macos 命令行

    ```js
        打开on my zsh
        open ~/.zshrcs

        sudo mongod --dbpath=/Users/licheng/data

        upgrade_oh_my_zsh 自动更新
        omz update //  手动跟新 zsh
    ```

+ 显示隐藏的文件
  + 在要显示的文件目录上 `shift + comman + .`

### homebrew

+ brew list 查看安装的软件
+ brew install xx (brew install git)

+ brew 已经移除`mongodb` [查看](https://juejin.im/post/6844903962525728782)

### 编辑Hosts (mac)

+ 终端编辑
  + 背景: 命令行安装 oh-my-zsh。报错显示`curl: (7) Failed to connect to raw.github.com port 443: Connection refused`
  + 解释: git 被墙了
  + 解决：不要挂代理，打开[https://www.ipaddress.com/](https://www.ipaddress.com/) 输入 `raw.github.com` 得到ip地址 然后编辑Host文件
  + 目的: zsh 主题随机

    ```js
        sudo vim /etc/hosts

        ex : 199.232.68.133 raw.github.com
        最后 esc  :wq 保存退出编辑
    ```

### 苹果妙控鼠标

+ 移动速度慢
  + defaults read -g com.apple.mouse.scaling
  + defaults write -g com.apple.mouse.scaling 9

### mongodb

+ brew services start mongodb-community

### 键盘对应键位

+ alt 对应 option
+ win 对应command

### ._开头文件删除

+ `alias sweep="find . -name .DS_Store -type f -delete ; find . -type d | xargs dot_clean -m"`
+ 在要删除的文件夹中运行`sweep`
