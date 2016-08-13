#!/usr/bin/python
import os
import webbrowser
import sys

username=sys.argv[1]
print "username:" + username

cmd1="ssh -L 9999:node-041:9999 -L 8001:node-048:8001 -L 8080:172.16.4.61:8181 -L 8123:172.16.4.51:8181 " + username + "@txe1-portal.mit.edu -N -f"

print "command: " + cmd1

os.system(cmd1)
webbrowser.open_new('http://localhost:8001/istc-explorer/web/')
webbrowser.open_new('http://localhost:8001/sflviz/')
webbrowser.open_new('http://localhost:8001/2a/')
webbrowser.open_new('http://localhost:8001/screen4/')
