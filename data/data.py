import pymysql
import csv
from passlib.hash import bcrypt


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

    with open("./user.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            email = row[0]
            user_name = row[1]
            password = row[2]
            hashed_password = bcrypt.hash(password)
            img = row[3]
            query = "insert into User (email, username, password, img) values ('%s','%s','%s','%s')" % \
                    (email, user_name, hashed_password, img)
            try:
                cur.execute(query)
            except:
                print("This piece of data has been inserted already!")

    conn.commit()
    # let housing = "create table Housing (" +
    # "housing_id int NOT NULL AUTO_INCREMENT," +
    # "housing_name varchar(255) NOT NULL,"+
    # "username varchar(255) NOT NULL," +
    # "address varchar(255) NOT NULL," +
    # "city varchar(255) NOT NULL," +
    # "housing_type varchar(255) NOT NULL," +
    # "description varchar(1024) NOT NULL, " +
    # "img_url varchar(1024) NOT NULL, " +
    # "PRIMARY KEY (housing_id)," +
    # "FOREIGN KEY (username) REFERENCES User (username)" +
    # ");";

    with open("./housing.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            housing_name = row[0]
            housing_username = row[1]
            address = row[2]
            city = row[3]
            housing_type = row[4]
            description = row[5]
            img_url = row[6]
            query = "insert into Housing (housing_name, housing_username, address, city, "\
            "housing_type, description, img_url) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s')" % \
            (housing_name, housing_username, address, city, housing_type, description, img_url)
            cur.execute(query)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    main()
