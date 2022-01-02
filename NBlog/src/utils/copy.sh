#!/bin/sh
cd /d/Local Repository/node/NBlog/logs
cp access.log $(date + %Y-%m-%d).access.log
echo "" > access.log



