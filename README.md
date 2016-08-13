# Bigdawg Demo
This contains demo screens for the bigdawg 2016 ISTC system. Individual screens' git repositories are pulled in recursively, and displayed via iframes.

## Adding a repository/submodule
`git submodule add https://github.com/YOUR_USERNAME/YOUR_REPO`

## Cloning this repo
`git clone --recursive https://github.com/CSAIL-LivingLab/bigdawg_2a`

----

## Running this repo
1. Port forward to E1:
For screens 0,2,4: Forward 8001 to node-048:8001 and 8080
to 172.16.5.51:8181
For TupleWare: Forward 9999 to node-041:9999
For S-Store: Forward 8123 to 172.16.4.51:8181

For example:
 $ssh username@txe1-login.mit.edu -L 9999:node-041:9999 -L 8001:node-048:8001 -L 8080:172.16.4.61:8181 -L 8123:172.16.4.51:8181

2. Run a python simplehttpserver in the home directory: `python -m SimpleHTTPServer 8001`
3. Open localhost in the browser: http://localhost:8001/template/


##Screen Specific Instructions
1. For screen 1, you need to have S-Store running by running the
following script (it runs for ~20 minutes)

	$/home/gridsan/groups/istcdata/technology/sstore2016/runsstorebigdawg.sh

2. For screen 4, you need to have Tupleware running:

   $./tupleware -s  http://172.16.4.52:8181/bigdawg/query -p 9999


##Current Places where things are running:

Tupleware: node-041
S-Store: node-041
BigDAWG for S-Store: 172.16.4.51:8181
BigDAWG (others): 172.16.4.61:8181
Webserver: node-048:8001

##Using script in demo_scripts:

$python runDemo.py USERNAME
