#kill tunnels

ps -ef | grep " -L" | grep ssh | awk '{print $2}' | xargs kill
