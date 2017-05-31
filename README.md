

# Inventory_Management

## Setup

### Install MySQL and create a database schema:

1) Install mysql server and prerequisites for running the script
    sudo apt-get update
    sudo apt-get install mysql-server
    //Create a user credentials with username : "root" and password : "test"

    sudo apt-get install python2.7-mysqldb

2) Install paramiko and sshtunnel 

    pip install paramiko
    pip install sshtunnel

    //If there is an error while inserting paramiko or sshtunnel, most probably it's because of unavailability of build tools. Install the build tools with below command.

    (Optional : In case of paramiko failure)

    sudo apt-get install python-dev libxml2-dev libxslt1-dev zlib1g-dev

    sudo apt-get install build-essential autoconf libtool pkg-config python-opengl python-imaging python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3 python-dev libssl-dev

    pip install paramiko
    pip install sshtunnel

3) Login to mysql and create schema:

    mysql -u root -p

    create database inventory;
    use inventory;

    CREATE TABLE chassis_master (
    run_id INT(6),
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    chassis_id VARCHAR(100),
    chassis_ip VARCHAR(30),
    management1_kernel_version VARCHAR(30),
    management1_software_version VARCHAR(30),
    management1_atmel_version VARCHAR(30),
    management1_fpga_version VARCHAR(30),
    management2_kernel_version VARCHAR(30),
    management2_software_version VARCHAR(30),
    management2_atmel_version VARCHAR(30),
    management2_fpga_version VARCHAR(30),
    date TIMESTAMP
    );

    CREATE TABLE drive_master (
        run_id INT(6),
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        chassis_id VARCHAR(100),
        chassis_ip VARCHAR(30),
        drive_fru VARCHAR(100),
        drive_serial VARCHAR(100),
        drive_model VARCHAR(30),
        drive_capacity VARCHAR(30),
        drive_firmware VARCHAR(100),
        date TIMESTAMP
    );

    CREATE TABLE controller_master (
        run_id INT(6),
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        chassis_id VARCHAR(100),
        chassis_ip VARCHAR(30),
        serial  VARCHAR(100),
        slot    INT(2) UNSIGNED,
        date TIMESTAMP
    );


    CREATE TABLE management_master (
        run_id INT(6),
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        chassis_id VARCHAR(100),
        chassis_ip VARCHAR(30),
        serial  VARCHAR(100),
        slot    INT(2) UNSIGNED,
        date TIMESTAMP
    );

    CREATE TABLE RUN_DETAILS(
        run_id INT(6) PRIMARY KEY,
        date TIMESTAMP
    );

    CREATE  TABLE chassis_available(
        chassis_ip VARCHAR(30),
        chassis_username VARCHAR(30),
        chassis_password VARCHAR(30),
        status INT(1)
    );

4) Copy the Source files from SVN and execute setup.sh

    ./setup.sh

5) Setup a cron job to run Collect_chassis_details.py which collects chassis details.

    0 8,20 * * * /usr/bin/python /root/inventory/Inventory/Collect_chassis_details.py

6) To stop the process use forever command
    "forever stopall"
