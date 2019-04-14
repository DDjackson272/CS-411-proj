import pymysql
import csv
from passlib.hash import bcrypt

def drop_all_tables(conn):
    drop_list = ["Comment", "Recommend", "Housing", "Activity", "User", "HousingFeature"]
    cur = conn.cursor()
    for item in drop_list:
        drop_query = "drop table %s;" % item
        try:
            cur.execute(drop_query)
            conn.commit()
        except:
            print("Table %s is not in the database, no need to drop!" % item)

def create_all_tables(conn):
    cur = conn.cursor()

    query_user = "create table User (" +\
    "user_id int NOT NULL AUTO_INCREMENT," +\
    "email varchar(255) NOT NULL UNIQUE," +\
    "username varchar(255) NOT NULL UNIQUE," +\
    "password varchar(255) NOT NULL," +\
    "img varchar(1024) NOT NULL," +\
    "PRIMARY KEY (user_id)" +\
    ");"

    query_housing = "create table Housing (" +\
    "housing_id int NOT NULL AUTO_INCREMENT," +\
    "housing_name varchar(255) NOT NULL,"+\
    "housing_username varchar(255) NOT NULL," +\
    "address varchar(255) NOT NULL," +\
    "city varchar(255) NOT NULL," +\
    "housing_type varchar(255) NOT NULL," +\
    "description varchar(1024) NOT NULL, " +\
    "img_url varchar(1024) NOT NULL, " +\
    "PRIMARY KEY (housing_id)," +\
    "FOREIGN KEY (housing_username) REFERENCES User (username)" +\
    ");"

    query_activity = "create table Activity (" +\
    "activity_id int NOT NULL AUTO_INCREMENT," +\
    "activity_name varchar(255) NOT NULL," +\
    "username varchar(255) NOT NULL," +\
    "address varchar(255) NOT NULL," +\
    "city varchar(255) NOT NULL," +\
    "type varchar(255) NOT NULL," +\
    "description varchar(1024) NOT NULL," +\
    "date DATE NOT NULL," +\
    "img_url varchar(1024) NOT NULL," +\
    "PRIMARY KEY (activity_id), " +\
    "FOREIGN KEY (username) REFERENCES User (username)" +\
    ");"

    query_coordinate = "create table Coordinate (" +\
    "coordinate_id int NOT NULL AUTO_INCREMENT, " +\
    "housing_id int NOT NULL, " +\
    "latitude float(53) NOT NULL, " +\
    "longitude float(53) NOT NULL, " +\
    "PRIMARY KEY (coordinate_id), " +\
    "FOREIGN KEY (housing_id) REFERENCES Housing (housing_id)" +\
    ");"

    query_recommend = "create table Recommend (" +\
    "recommend_id int NOT NULL AUTO_INCREMENT," +\
    "recommend_username varchar(255) NOT NULL, " +\
    "recommend_housing_id int NOT NULL," +\
    "PRIMARY KEY (recommend_id)," +\
    "FOREIGN KEY (recommend_username) REFERENCES User (username)," +\
    "FOREIGN KEY (recommend_housing_id) REFERENCES Housing (housing_id)" +\
    ");"

    query_housing_feature = "create table HousingFeature (" +\
    "housing_feature_id int NOT NULL AUTO_INCREMENT,"+\
    "housing_feature_housing_id int NOT NULL,"+\
    "clean int NOT NULL, "+\
    "cooking int NOT NULL, "+\
    "landlord int NOT NULL, "+\
    "PRIMARY KEY (housing_feature_id),"+\
    "FOREIGN KEY (housing_feature_housing_id) REFERENCES Housing (housing_id)"+\
    ");"

    query_list = [query_user, query_housing, query_activity, query_comment, query_recommend, query_housing_feature]

    for item in query_list:
        cur.execute(item)
        conn.commit()


def main():
    # local db
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='CS411!!!',
        db='cs411proj')

    drop_all_tables(conn)
    create_all_tables(conn)

    # # aws db
    # conn = pymysql.connect(
    #     host="tutorial-db-web.cjb5il7njevi.us-east-2.rds.amazonaws.com",
    #     port=3306,
    #     user="tutorial_user",
    #     passwd="Zhe12345!",
    #     db="sample"
    # )

    # add User to db
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

    # add housing to db
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

    # add comment to db
    with open("./comment.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            comment_housing_id = row[0]
            comment_user_id = row[1]
            comment_content = row[2]
            query = "insert into Comment (comment_housing_id, comment_user_id, content) "\
            "values (%s, %s, '%s')" % (int(comment_housing_id), int(comment_user_id), comment_content)
            cur.execute(query)

    conn.commit()

    conn.close()


if __name__ == "__main__":
    main()
