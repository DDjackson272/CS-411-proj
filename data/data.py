import pymysql
import csv
from passlib.hash import bcrypt


def write_csv_to_db(conn, file_name):
    table_name = file_name.split(".")[0]
    with open(file_name, 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            if table_name == "user":
                email = row[0]
                user_name = row[1]
                password = row[2]
                hashed_password = bcrypt.hash(password)
                img = row[3]
                query = "insert into user (email, username, password, img) values ('%s','%s','%s','%s')" % \
                        (email, user_name, hashed_password, img)
                print(query)
                cur.execute(query)


def main():
    # local db
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='CS411!!!',
        db='cs411proj')

    # # aws db
    # conn = pymysql.connect(
    #     host="tutorial-db-web.cjb5il7njevi.us-east-2.rds.amazonaws.com",
    #     port=3306,
    #     user="tutorial_user",
    #     passwd="Zhe12345!",
    #     db="sample"
    # )

    write_csv_to_db(conn, "user.csv")
    conn.commit()
    conn.close()


if __name__ == "__main__":
    main()
