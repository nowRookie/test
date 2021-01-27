@echo off

:: 文件编码格式必须是ANSI，否则汉字乱码
:: echo相当于print
:: 这里的"::"表示注释
:: 定时关机命令:shutdown -f -s -t  秒数
:: set /a表示进行运算
:: %变量名%
:: set /p表示暂停命令执行，让用户输入，userHour表示变量，=后面的值为显示的内容

echo 输入命令，a:取消关机，y:继续关机
set /p cmd=请输入：
if %cmd%==a goto cancel

set /p userHour=请输入小时：
set /a second = %userHour%*3600
echo "电脑将在%userHour%"小时之后关闭
shutdown -f -s -t %second%
goto end

:cancel
echo "用户输入了a，已经取消操作了"
shutdown -a

:end
exit
