callbackFunction({
  "title": "常用的脚本命令（代理和软连接）",
  "sections": [
    {
      "title": "一、使用第三方代理在命令行下载",
      "steps": [
        {
          "title": "1.1 如git中设置第三方代理地址",
          "content": "",
          "code": "git中设置http代理\ngit中设置https代理\ngit中取消http代理\ngit中取消https代理\n\ngit config --global http.proxy \"http://192.168.1.105:7890\"\ngit config --global https.proxy \"http://192.168.1.105:7890\"\ngit config --global --unset http.proxy\ngit config --global --unset https.proxy\n\n",
          "note": "设置完后，就可以正常使用git clone了",
          "image": {
            "src": "https://www.pkcile.cn/img/software/git_1.png",
            "alt": "git图标",
            "caption": "图1: git截图",
            "placeholder": "git图加载中..."
        }
        },
        {
          "title": "1.2 在命令行中临时设置代理地址",
          "content": "",
          "code": "在命令行中我们通常情况下访问不了外网，但通过代理后，就可以。设置以下两种代理：\nhttp请求代理\nhttps请求代理\n\nset http_proxy=http://localhost:7890\nset https_proxy=http://localhost:7890",
          "note": "设置完代理后就能正常访问google、youtube网站了：\ncurl https://www.google.com\ncurl https://www.youtube.com",
          "image": {
            "src": "https://i0.hdslb.com/bfs/archive/af20fb6b728d25ce8a36453ea02b4ddd4ca62677.jpg@672w_378h_1c_!web-home-common-cover.avif",
            "alt": "Python安装界面",
            "caption": "图2: Python安装界面截图",
            "placeholder": "Python安装界面加载中..."
        }
        }
      ]
    },
    {
      "title": "二、软链接",
      "steps": [
        {
          "title": "2.1 常用在windows电脑中",
          "content": "windows电脑下将一个共享目录软连接到一个文件夹中",
          "code": "mklink /D \"D:\\app\\aaa\" \"Z:\"\n\n为D:\\app\\bbb <<====>> Z: 创建的符号链接",
          "note": "注意：创建软链接时，并没有aaa文件夹",
          "image": {
            "src": "https://www.pkcile.cn/img/software/5.png",
            "alt": "大象图",
            "caption": "图3: 大象图",
            "placeholder": "大象图加载中..."
        }
        },
        
      ]
    }
  ],
  "notes": []
})
