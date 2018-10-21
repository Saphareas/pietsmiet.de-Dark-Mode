mkdir temp
xcopy /s _shared\* temp
xcopy /s chrome\* temp
7z a -tzip .releases\chrome.zip .\temp\*
xcopy /s /y firefox\* temp
7z a -tzip .releases\firefox.zip .\temp\*
xcopy /s /y edge\* temp
7z a -tzip .releases\edge.zip .\temp\*
rd /s /q temp