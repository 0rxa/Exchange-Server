/* First you need to create a database.
   CREATE DATABASE db;		     */

DROP TABLE IF EXISTS 'val0';
CREATE TABLE 'val0' (
	`ix` int(11) NOT NULL AUTO_INCREMENT,
	`sell` varchar(12),
	`buy` varchar(12)
);

/* To connect php to this database you are going need to create a user with a native mysql password.
   CREATE USER 'user'@'domain' IDENTIFIED WITH mysql_native_password by 'password';
   GRANT ALL ON val.val0 to 'user'@'domain';							  */
