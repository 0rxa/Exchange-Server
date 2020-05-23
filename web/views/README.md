# Exchange-Server
Web Page supposed to display several foreign currencies exchanged with one assumed home currency.
In order to use this project you need to have a web server and a sql server installed.

After installing the web server, move this project to /var/www/Exchange-Server and create a virtual host pointing to that path.

After installing the mysql database, create a database and table referencing the start.sql script and change the values in scripts/update\*php according to your servers credentials.

At this point you're up and running, just remember to share any changes you make to the code because the project is released under GPL V3.0.
