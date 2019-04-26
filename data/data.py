import pymysql
import csv
import random
from passlib.hash import bcrypt
from get_feature import get_data_from_db, get_feature_db
from recommend import k_means_recommendation

# fill data base with some initial data


INITIAL_DATA_PATH = "./initial"
FILE_PATH = "./FromDB"


def gen_history_csv():
    history_tuple_list = list()
    # number of user, initially 18
    for i in range(1, 19):
        # number of housing, initially 20
        for j in range(1, 21):
            visited_house_id = random.randint(1, 10)
            if visited_house_id <= 5:
                history_tuple_list.append((i, j))

    with open(INITIAL_DATA_PATH + "/history.csv", "w") as csv_file:
        writer = csv.writer(csv_file, delimiter=",")
        for tup in history_tuple_list:
            writer.writerow([tup[0]] + [tup[1]])


def drop_all_tables(conn):
    drop_list = ["Comment", "Recommend", "Housing", "Activity", "User",
                 "HousingFeature", "History", "Sentiment"]
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

    query_user = "create table User (" + \
                 "user_id int NOT NULL AUTO_INCREMENT," + \
                 "email varchar(255) NOT NULL UNIQUE," + \
                 "username varchar(255) NOT NULL UNIQUE," + \
                 "password varchar(255) NOT NULL," + \
                 "img varchar(1024) NOT NULL," + \
                 "PRIMARY KEY (user_id)" + \
                 ");"

    query_housing = "create table Housing (" + \
                    "housing_id int NOT NULL AUTO_INCREMENT," + \
                    "housing_name varchar(255) NOT NULL," + \
                    "housing_username varchar(255) NOT NULL," + \
                    "address varchar(255) NOT NULL," + \
                    "city varchar(255) NOT NULL," + \
                    "housing_type varchar(255) NOT NULL," + \
                    "description varchar(1024) NOT NULL, " + \
                    "img_url varchar(1024) NOT NULL, " + \
                    "PRIMARY KEY (housing_id)," + \
                    "FOREIGN KEY (housing_username) REFERENCES User (username)" + \
                    ");"

    query_comment = "create table Comment (" + \
                    "comment_id int NOT NULL AUTO_INCREMENT," + \
                    "comment_housing_id int NOT NULL, " + \
                    "comment_user_id int NOT NULL, " + \
                    "content varchar(1024) NOT NULL," + \
                    "PRIMARY KEY (comment_id)," + \
                    "FOREIGN KEY (comment_housing_id) REFERENCES Housing (housing_id)," + \
                    "FOREIGN KEY (comment_user_id) REFERENCES User (user_id)" + \
                    ");"

    query_recommend = "create table Recommend (" + \
                      "recommend_id int NOT NULL AUTO_INCREMENT," + \
                      "recommend_username varchar(255) NOT NULL, " + \
                      "recommend_housing_id int NOT NULL," + \
                      "PRIMARY KEY (recommend_id)," + \
                      "FOREIGN KEY (recommend_username) REFERENCES User (username)," + \
                      "FOREIGN KEY (recommend_housing_id) REFERENCES Housing (housing_id)" + \
                      ");"

    query_housing_feature = "create table HousingFeature (" + \
                            "housing_feature_id int NOT NULL AUTO_INCREMENT," + \
                            "housing_feature_housing_id int NOT NULL," + \
                            "parking int NOT NULL, " + \
                            "cooking int NOT NULL, " + \
                            "large_bed int NOT NULL, " + \
                            "PRIMARY KEY (housing_feature_id)," + \
                            "FOREIGN KEY (housing_feature_housing_id) REFERENCES Housing (housing_id)" + \
                            ");"

    query_history = "create table History (" + \
                    "history_id int NOT NULL AUTO_INCREMENT," + \
                    "history_user_id int NOT NULL," + \
                    "history_housing_id int NOT NULL," + \
                    "PRIMARY KEY (history_id), " + \
                    "FOREIGN KEY (history_user_id) REFERENCES User (user_id)," + \
                    "FOREIGN KEY (history_housing_id) REFERENCES Housing (housing_id)" + \
                    ");"

    query_sentiment = "create table Sentiment (" + \
                      "sentiment_id int NOT NULL AUTO_INCREMENT, " + \
                      "sentiment_housing_id int NOT NULL, " + \
                      "positive_comment int NOT NULL, " + \
                      "neutral_comment int NOT NULL, " + \
                      "negative_comment int NOT NULL, " + \
                      "overall_comment varchar(255) NOT NULL, " + \
                      "PRIMARY KEY (sentiment_id), " + \
                      "FOREIGN KEY (sentiment_housing_id) REFERENCES Housing (housing_id)" + \
                      ");"

    query_activity = "create table Activity (" + \
                     "activity_id int NOT NULL AUTO_INCREMENT," + \
                     "activity_name varchar(255) NOT NULL," + \
                     "username varchar(255) NOT NULL," + \
                     "address varchar(255) NOT NULL," + \
                     "city varchar(255) NOT NULL," + \
                     "type varchar(255) NOT NULL," + \
                     "description varchar(1024) NOT NULL," + \
                     "date DATE NOT NULL," + \
                     "img_url varchar(1024) NOT NULL," + \
                     "PRIMARY KEY (activity_id), " + \
                     "FOREIGN KEY (username) REFERENCES User (username)" + \
                     ");"

    query_list = [query_user, query_housing, query_activity,
                  query_comment, query_recommend, query_housing_feature, query_history, query_sentiment]

    for item in query_list:
        cur.execute(item)
        conn.commit()


def main():
    # local db
    # conn = pymysql.connect(
    #     host='localhost',
    #     port=3306,
    #     user='root',
    #     passwd='CS411!!!',
    #     db='cs411proj')

    # aws db
    conn = pymysql.connect(
        host="tutorial-db-web.cjb5il7njevi.us-east-2.rds.amazonaws.com",
        port=3306,
        user="tutorial_user",
        passwd="Zhe12345!",
        db="sample"
    )

    gen_history_csv()
    drop_all_tables(conn)
    create_all_tables(conn)

    # add User to db
    with open(INITIAL_DATA_PATH + "/user.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            email = row[0]
            user_name = row[1]
            password = row[2]
            hashed_password = bcrypt.hash(password)
            img = row[3]
            query = 'insert into User (email, username, password, img) values ("%s","%s","%s","%s")' % \
                    (email, user_name, hashed_password, img)
            cur.execute(query)

    conn.commit()
    print("User insertion done!")

    # add housing to db
    with open(INITIAL_DATA_PATH + "/housing.csv", 'r', encoding="utf-8") as csvfile:
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
            query = 'insert into Housing (housing_name, housing_username, address, city, ' \
                    'housing_type, description, img_url) values ("%s", "%s", "%s", "%s", "%s", "%s", "%s")' % \
                    (housing_name, housing_username, address, city, housing_type, description, img_url)
            cur.execute(query)

    conn.commit()
    print("Housing insertion done!")

    # add comment to db
    with open(INITIAL_DATA_PATH + "/comment.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            comment_housing_id = row[0]
            comment_user_id = row[1]
            comment_content = row[2]
            query = 'insert into Comment (comment_housing_id, comment_user_id, content) ' \
                    'values ("%s", "%s", "%s")' % (int(comment_housing_id), int(comment_user_id), comment_content)
            cur.execute(query)

    conn.commit()
    print("Housing comment insertion done!")

    # add housing_feature to db
    with open(INITIAL_DATA_PATH + "/housing_feature.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            housing_feature_housing_id = row[0]
            parking = row[1]
            cooking = row[2]
            large_bed = row[3]
            query = 'insert into HousingFeature (housing_feature_housing_id, parking, cooking, large_bed) ' \
                    'values ("%s", "%s", "%s", "%s")' % (int(housing_feature_housing_id), int(parking), \
                                                         int(cooking), int(large_bed))
            cur.execute(query)
    conn.commit()
    print("Housing feature insertion done!")

    # add history to db
    with open(INITIAL_DATA_PATH + "/history.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            history_user_id = row[0]
            history_housing_id = row[1]
            query = 'insert into History (history_user_id, history_housing_id) ' \
                    'values ("%s", "%s")' % (int(history_user_id), int(history_housing_id))
            cur.execute(query)
    conn.commit()
    print("History insertion done!")

    # add sentiment to db
    with open(INITIAL_DATA_PATH + "/sentiment.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            sentiment_housing_id = row[0]
            positive_comment = row[1]
            neutral_comment = row[2]
            negative_comment = row[3]
            overall_comment = row[4]
            query = 'insert into Sentiment (sentiment_housing_id, positive_comment, ' \
                    'neutral_comment, negative_comment, overall_comment) values (%s, %s, %s, %s, "%s")' % \
                    (int(sentiment_housing_id), int(positive_comment),
                     int(neutral_comment), int(negative_comment), overall_comment)
            cur.execute(query)
    conn.commit()
    print("Sentiment insertion done!")

    get_data_from_db(conn)
    get_feature_db()
    k_means_recommendation()

    # add recommend_housing to db
    with open(INITIAL_DATA_PATH + "/recommend.csv", 'r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        cur = conn.cursor()
        for row in reader:
            recommend_username = row[0]
            recommend_housing_id = row[1]
            query = 'insert into Recommend (recommend_username, recommend_housing_id) values ' \
                    '("%s", %s)' % (recommend_username, int(recommend_housing_id))
            cur.execute(query)
    conn.commit()
    print("Recommend insertion done!")

    conn.close()


if __name__ == "__main__":
    main()
