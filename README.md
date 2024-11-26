



CocosCreator 2.4.11热更新实现方案(AssetBundle),大厅+子游戏模式快速实现
========


实现功能:
1. 热更新基于 Asset Bundle 实现 大厅+子游戏 模式,
   低优先级模块可引用高优先级模块中资源及脚本,
   可配置模块依赖,被依赖的模块会自动更新.
2. 热更新模块可以打到包里随发布包一起发布,免去首次启动游戏就完整下载模块.
3. 多模块在同一工程下开发.


--------
需安装 NodeJs

执行 tools 下的 "构造HotRes_macos.sh" / "构造HotRes_windows.bat",将会在根目录 [hotRes]下生成完整的热更新资源以及版本控制文件verconfig.json.

执行 tools 下的 "构造PKgamecaches_macos.sh" / "构造PKgamecaches_windows.bat",将会在[/build/jsb-link/assets/]
生成随包发布的热更模块 PKgamecaches .
