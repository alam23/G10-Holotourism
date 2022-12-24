# G10-Holotourism

Para desplegar la aplicación, se debe tener lo siguiente:
* Servidor Ubuntu 18.04 con un usuario no root y firewall activo
* Un dominio apuntando a tu ip pública
* Nginx instalado y configurado con certificados SSL usando Let's Encrypt
* Un server block creado en Nginx. Para este caso usaremos "holotourism.com" 
* pm2 instalado
* Proyecto clonado

Con el usuario no root:


En la carpeta del proyecto ejecutar:
```
pm2 start index.js
```
Regresar al directorio raíz y ejecutar:
```
sudo nano /etc/nginx/sites-available/holotourism.com
```
Agregar en el archivo abierto:
```
server {
...
    location / {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
...
}
```
Reiniciar el Nginx:
```
sudo systemctl restart nginx
