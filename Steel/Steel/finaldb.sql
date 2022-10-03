CREATE DATABASE finaldb;
USE finaldb;

CREATE TABLE login (
user_name varchar(20),
Password varchar(20) );

INSERT INTO login values(
'pradumya', '1234' );
CREATE TABLE purchase (
pid varchar(20),
dname varchar(20),
type varchar(20),
size varchar(20),
price varchar(20),
weight varchar(20),
total varchar(20),
date varchar(20) );

CREATE TABLE Stock (
type varchar(20),
weight varchar(20),
price varchar(20),
size varchar(20) );

CREATE TABLE Customer (
cust_id varchar(20),
cust_name varchar(20),
cust_mobile varchar(20),
cust_address varchar(20) );

CREATE TABLE Bill (
billid varchar(20),
name varchar(20),
contact varchar(20),
gtotal varchar(20),
datee date );

CREATE TABLE dealer (
deal_id varchar(20),
deal_name varchar(20),
deal_mobile varchar(20),
deal_address varchar(20) );

CREATE TABLE sale (
sid varchar(20),
snumber varchar(20),
sname varchar(20),
s_type varchar(20),
weight varchar(20),
price varchar(20),
total varchar(20),
date varchar(20),
size varchar(20) );