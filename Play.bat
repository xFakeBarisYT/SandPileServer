@echo off

REM Run the first batch file
start /min cmd /c "C:\Users\Toshiba\Desktop\Sandpile Creator\GAME_ROBLOXHQ\launch_server.bat"


REM Prompt the user for the number of times to run the second batch file
set /p run_count="Client Amount: "

REM Run the second batch file the specified number of times
if %run_count% GTR 4 set run_count=4

for /l %%x in (1, 1, %run_count%) do (
    call "C:\Users\Toshiba\Desktop\Sandpile Creator\GAME_ROBLOXHQ\launch_client.bat"
)