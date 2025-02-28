CREATE DATABASE IF NOT EXISTS database1;
CREATE DATABASE IF NOT EXISTS database2;

-- ALTER USER 'myuser'@'%' IDENTIFIED WITH sha256_password BY 'example';

GRANT ALL PRIVILEGES ON database1.* TO 'myuser'@'%';
GRANT ALL PRIVILEGES ON database2.* TO 'myuser'@'%';

FLUSH PRIVILEGES;