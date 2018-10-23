#!/bin/bash
mkdir temp
cp -Rv _shared/* temp/
cp -Rv chrome/* temp/
cd temp
7z a -tzip ../releases/chrome.zip *
cd ..
cp -Rv firefox/* temp/
cd temp
7z a -tzip ../releases/firefox.zip *
cd ..
cp -Rv edge/* temp/
cd temp
7z a -tzip ../releases/edge.zip *
cd ..
rm -Rv temp
