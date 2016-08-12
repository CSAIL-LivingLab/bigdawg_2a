# Bigdawg Demo
This contains demo screens for the bigdawg 2016 ISTC system. Individual screens' git repositories are pulled in recursively, and displayed via iframes.

## Adding a repository/submodule
`git submodule add https://github.com/YOUR_USERNAME/YOUR_REPO`

## Cloning this repo
`git clone --recursive https://github.com/CSAIL-LivingLab/bigdawg_2a`

----

## Running this repo
1. Port forward to istc3: `ssh -i ~/.ssh/id_rsa -L localhost:8080:172.16.4.61:8181 YOURUSERNAME@txe1-portal.mit.edu`
2. Run a python simplehttpserver in the home directory: `python -m SimpleHTTPServer 8000`
3. Open localhost in the browser: http://localhost:8000/template/
