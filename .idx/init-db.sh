#!/bin/bash

# mysql -u root -e "SHOW DATABASES;"

mysql -u root -e "CREATE DATABASE IF NOT EXISTS database1;"
# mysql -e "SHOW DATABASES;"
mysql -u root -e "CREATE DATABASE IF NOT EXISTS database2;"


# mysql -e "CREATE USER 'myuser'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'new_password1';"

# mysql -e "GRANT ALL PRIVILEGES ON database1.* TO 'myuser'@'%';"
# mysql -e "GRANT -e ALL PRIVILEGES ON database2.* TO 'myuser'@'%';"

# mysql -e "FLUSH PRIVILEGES;"
