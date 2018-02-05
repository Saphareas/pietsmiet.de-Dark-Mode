mkdir temp
xcopy /s _shared\* temp
xcopy /s chrome\* temp
7z a -tzip chrome.zip .\temp\*
xcopy /s /y firefox\* temp
7z a -tzip firefox.zip .\temp\*
rd /s /q temp