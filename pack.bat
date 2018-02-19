mkdir temp
xcopy /s _shared\* temp
xcopy /s chrome\* temp
7z a -tzip ps-dark-chrome.zip .\temp\*
xcopy /s /y firefox\* temp
7z a -tzip ps-dark-firefox.zip .\temp\*
xcopy /s /y edge\* temp
7z a -tzip ps-dark-edge.zip .\temp\*
rd /s /q temp