import MySQLdb
from sshtunnel import SSHTunnelForwarder
import time
import datetime
import paramiko
localDBUser = "root"
localDBPassword = "test"

def testConnection(target_ip, target_user, target_password):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(target_ip, username=target_user, password=target_password, timeout=10)
        print "Connection available go ahead"
        return True
    except Exception, e:
        print e
        print "Couldn't connect"
        return False

def get_run_id(localDBUser,localDBPassword):

    localDB = MySQLdb.connect("localhost", localDBUser, localDBPassword, "inventory")
    query_cursor = localDB.cursor()
    query_cursor.execute("SELECT count(run_id) from RUN_DETAILS")
    data = query_cursor.fetchone()
    run_count = int(data[0])+1
    print run_count
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    try:
        query_cursor.execute(
            """INSERT into RUN_DETAILS (run_id,date) values(%s,%s)"""
            , (run_count,timestamp))
        localDB.commit()
    except:
        print "failed to insert"
        localDB.rollback()
        return -1

    return run_count


def upload_drive_details(run_id,target_ip,target_user,target_password,localDBUser,localDBPassword):
    ch_id = ""
    ch_ip = target_ip
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

    with SSHTunnelForwarder(
            (target_ip, 22),
            ssh_password=target_password,
            ssh_username=target_user,
            remote_bind_address=('127.0.0.1', 3306)) as server:
        conn = MySQLdb.connect(host='127.0.0.1',
                               port=server.local_bind_port,
                               user='root',
                               passwd='test',
                               db='pavilion')

        cursor = conn.cursor()
        cursor.execute(
            "select CHASSIS_ID,FRU_ID,SERIAL,MODEL,TOTAL_CAPACITY,FIRMWARE from PVL_VIEW_CHASSIS_DRIVE where NAME != 'NULL'")
        drive_details = cursor.fetchall()

        values = ""
        first_record = True
        for drive in drive_details:
            if first_record:
                #('mike','21')
                values += "('"+str(run_id)+"','"+str(drive[0])+"','"+str(target_ip)+"','"+str(drive[1])+"','"+str(drive[2])+"','"+str(drive[3])+"','"+str(drive[4])+"','"+str(drive[5])+"','"+timestamp+"')"
                first_record = False
            else:
                values += ",('" + str(run_id) + "','" + str(drive[0]) + "','" + str(target_ip) + "','" + str(
                    drive[1]) + "','" + str(drive[2]) + "','" + str(drive[3]) + "','" + str(drive[4]) + "','" + str(
                    drive[5]) + "','" + timestamp + "')"

        try:

            localDB = MySQLdb.connect("localhost", localDBUser, localDBPassword, "inventory")

            insert_cursor = localDB.cursor()
            insert_cursor.execute("INSERT into drive_master (run_id,chassis_id,chassis_ip,drive_fru,drive_serial,drive_model,drive_capacity,drive_firmware,date) values"+values)
            localDB.commit()
            localDB.close()

        except:
            print "failed to insert"
            localDB.rollback()
            localDB.close()

        conn.close()



def upload_controller_details(run_id,target_ip,target_user,target_password,localDBUser,localDBPassword):
    ch_id = ""
    ch_ip = target_ip
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

    with SSHTunnelForwarder(
            (target_ip, 22),
            ssh_password=target_password,
            ssh_username=target_user,
            remote_bind_address=('127.0.0.1', 3306)) as server:
        conn = MySQLdb.connect(host='127.0.0.1',
                               port=server.local_bind_port,
                               user='root',
                               passwd='test',
                               db='pavilion')

        cursor = conn.cursor()
        cursor.execute(
            "select CHASSIS_ID,SERIAL,SLOT from PVL_CONTROLLER where status = 1 and ID between 1 and 20")
        drive_details = cursor.fetchall()

        values = ""
        first_record = True
        for drive in drive_details:
            if first_record:
                # ('mike','21')
                values += "('" + str(run_id) + "','" + str(drive[0]) + "','" + str(target_ip) + "','" + str(
                    drive[1]) + "','" + str(drive[2]) + "','" +timestamp + "')"
                first_record = False
            else:
                values += ",('" + str(run_id) + "','" + str(drive[0]) + "','" + str(target_ip) + "','" + str(
                    drive[1]) + "','" + str(drive[2]) + "','" + timestamp + "')"

        try:

            localDB = MySQLdb.connect("localhost", localDBUser, localDBPassword, "inventory")

            insert_cursor = localDB.cursor()
            insert_cursor.execute(
                "INSERT into controller_master (run_id,chassis_id,chassis_ip,serial,slot,date) values" + values)
            localDB.commit()
            localDB.close()

        except:
            print "failed to insert"
            localDB.rollback()
            localDB.close()

        conn.close()


def upload_management_details(run_id,target_ip,target_user,target_password,localDBUser,localDBPassword):
    ch_id = ""
    ch_ip = target_ip
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

    with SSHTunnelForwarder(
            (target_ip, 22),
            ssh_password=target_password,
            ssh_username=target_user,
            remote_bind_address=('127.0.0.1', 3306)) as server:
        conn = MySQLdb.connect(host='127.0.0.1',
                               port=server.local_bind_port,
                               user='root',
                               passwd='test',
                               db='pavilion')

        cursor = conn.cursor()
        cursor.execute(
            "select CHASSIS_ID,SERIAL,SLOT from PVL_CONTROLLER where state = 1 and ID in (21, 22)")
        drive_details = cursor.fetchall()

        values = ""
        first_record = True
        for drive in drive_details:
            if first_record:

                values += "('" + str(run_id) + "','" + str(drive[0]) + "','" + str(target_ip) + "','" + str(
                    drive[1]) + "','" + str(drive[2]) + "','" +timestamp + "')"
                first_record = False
            else:
                values += ",('" + str(run_id) + "','" + str(drive[0]) + "','" + str(target_ip) + "','" + str(
                    drive[1]) + "','" + str(drive[2]) + "','" + timestamp + "')"


        try:

            localDB = MySQLdb.connect("localhost", localDBUser, localDBPassword, "inventory")

            insert_cursor = localDB.cursor()


            insert_cursor.execute(
                "INSERT into management_master (run_id,chassis_id,chassis_ip,serial,slot,date) values" + values)
            localDB.commit()
            localDB.close()

        except:
            print "failed to insert"
            localDB.rollback()
            localDB.close()

        conn.close()




def upload_chassis_details(run_id,target_ip,target_user,target_password,localDBUser,localDBPassword):

    ch_id = ""
    ch_ip = target_ip
    ch_management1_kernel_version = ""
    ch_management1_software_version = ""
    ch_management1_atmel_version = ""
    ch_management1_fpga_version = ""
    ch_management2_kernel_version = ""
    ch_management2_software_version = ""
    ch_management2_atmel_version = ""
    ch_management2_fpga_version = ""
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

    with SSHTunnelForwarder(
            (target_ip, 22),
            ssh_password=target_password,
            ssh_username=target_user,
            remote_bind_address=('127.0.0.1', 3306)) as server:
        conn = MySQLdb.connect(host='127.0.0.1',
                               port=server.local_bind_port,
                               user='root',
                               passwd='test',
                               db='pavilion')

        cursor = conn.cursor()
        cursor.execute("SELECT CHASSIS_ID,PROP_ID,PROP_VALUE FROM pavilion.PVL_CONTROLLER_PROPS where controller_id = 21")
        management1 = cursor.fetchall()

        for slot in management1:
            if ch_id == "":
                ch_id = slot[0]

            if slot[1] == "atmel_version":
                ch_management1_atmel_version = slot[2]
            elif slot[1] == "fpga_version":
                ch_management1_fpga_version = slot[2]
            elif slot[1] == "mgmt_kernel_version":
                ch_management1_kernel_version = slot[2]
            elif slot[1] == "mgmt_sw_version":
                ch_management1_software_version = slot[2]


        cursor.execute("SELECT CHASSIS_ID,PROP_ID,PROP_VALUE FROM pavilion.PVL_CONTROLLER_PROPS where controller_id = 22")
        management2 = cursor.fetchall()

        for slot in management2:
            if ch_id == "":
                ch_id = slot[0]

            if slot[1] == "atmel_version":
                ch_management2_atmel_version = slot[2]
            elif slot[1] == "fpga_version":
                ch_management2_fpga_version = slot[2]
            elif slot[1] == "mgmt_kernel_version":
                ch_management2_kernel_version = slot[2]
            elif slot[1] == "mgmt_sw_version":
                ch_management2_software_version = slot[2]


        try:

            localDB = MySQLdb.connect("localhost", localDBUser, localDBPassword, "inventory")
            insert_cursor = localDB.cursor()
            insert_cursor.execute("""INSERT into chassis_master (run_id,date,chassis_id,chassis_ip,management1_kernel_version,management1_software_version,management1_atmel_version,management1_fpga_version,management2_kernel_version,management2_software_version,management2_atmel_version,management2_fpga_version) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            ,(run_id,timestamp, ch_id, ch_ip, ch_management1_kernel_version, ch_management1_software_version,
            ch_management1_atmel_version, ch_management1_fpga_version, ch_management2_kernel_version,
            ch_management2_software_version, ch_management2_atmel_version, ch_management2_fpga_version))


            localDB.commit()

        except:
            print "failed to insert"
            localDB.rollback()

        localDB.close()
        conn.close()



if __name__ == "__main__":
    print "Start of the program"
    localDBUser = "root"
    localDBPassword = "test"
    run_id = get_run_id(localDBUser,localDBPassword)
    localDB = MySQLdb.connect("localhost", localDBUser, localDBPassword, "inventory")
    query_cursor = localDB.cursor()
    query_cursor.execute("SELECT chassis_ip,chassis_username,chassis_password from chassis_available where status = 1")
    data = query_cursor.fetchall()
    for chassis in data:
        if not testConnection(chassis[0], chassis[1], chassis[2]):
            continue
        upload_chassis_details(run_id, chassis[0], chassis[1], chassis[2],localDBUser,localDBPassword)
        upload_drive_details(run_id, chassis[0], chassis[1], chassis[2],localDBUser,localDBPassword)
        upload_controller_details(run_id, chassis[0], chassis[1], chassis[2],localDBUser,localDBPassword)
        upload_management_details(run_id, chassis[0], chassis[1], chassis[2],localDBUser,localDBPassword)

    print "updated all chassis details"

