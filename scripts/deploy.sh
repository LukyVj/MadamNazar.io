yarn build && rm build/static/js/*.map && mv build docs && git add . && git commit -m"Updae" && git push origin master && surge ./docs --domain https://backup-nazarfinder.surge.sh
