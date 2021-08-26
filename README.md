# emapta_test

## VUE APP SET UP IN UBUNTU OS

## Setting Up 
sudo apt update

sudo apt upgrade

## Setup NGINX
sudo apt install nginx


## Configure Virtual Host
## We need to edit the nginx configuration file to connect to our app. To edit it open /etc/nginx/sites-available/default configuration file by running:
sudo nano /etc/nginx/sites/sites-available/default


## Edit the file and reconfigure it as per your VueJS application.
server {
  listen 3000 default_server; //your desired port
  listen 192.168.100.65:3000 default_server; //your ip_Address
  root /var/www/html/vue-js-app-twt/dist; //you VueJS app path
  index index.html index.htm index.nginx-debian.html;
  server_name _;
  error_page 404 /index.html;
  location /vue-js-app-twt {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_max_temp_file_size 0;
    proxy_pass http://192.168.100.65:3000;
    proxy_redirect off;
    proxy_read_timeout 240s;
  }
}

## Setup Firewall for NGINX
## You can check the applications configurations that ufw knows by typing in:
sudo ufw app list

sudo ufw allow 'Nginx HTTP'


## Checking NGINX Service
systemctl status nginx

## You may also verify if the configurations you’ve made is fine by typing in the following command
sudo nginx -s reload

# Setup VueJS App
Git clone git@github.com:<link>/vue-js-app-twt.git 

npm install
npm run build

## FINAL
You may access your VueJS application by typing in http://your-ip-address:3000/ in your browser.





## Project setup in windows
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Run your unit tests
```
npm run test:unit
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

