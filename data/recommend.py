import pymysql
import numpy as np
import pandas as pd
import csv
from sklearn.cluster import KMeans
from get_feature import get_data_from_db, get_feature_db

FILE_PATH = "./FromDB"
INITIAL_DATA_PATH = "./initial"
CLUSTER_NUM = 1


def k_means_recommendation():
    user_favorite_type = dict()
    user_favorite_housing = dict()
    train_data = pd.read_csv(FILE_PATH + "/TrainingTable.csv")
    user_table = pd.read_csv(FILE_PATH + "/User.csv")[["user_id", "username"]]
    reference_house = pd.read_csv(FILE_PATH + "/FinalHousingFeature.csv")
    user_list = list(set(train_data['history_user_id'].tolist()))
    for user in user_list:
        username = user_table[user_table["user_id"] == user]["username"].tolist()[0]
        train_user_data = np.array(train_data[train_data['history_user_id'] == user][
                                       ["housing_type", "parking", "cooking", "large_bed"]])
        k_means_user = KMeans(n_clusters=CLUSTER_NUM).fit(train_user_data)
        user_favorite_type[username] = np.round(k_means_user.cluster_centers_).tolist()

    for user in user_favorite_type:
        for value in user_favorite_type[user]:
            housing_type = int(value[0])
            parking = int(value[1])
            cooking = int(value[2])
            large_bed = int(value[3])
            housing_id_set = reference_house[(reference_house["housing_type"] == housing_type) &
                                             (reference_house["parking"] == parking) & (
                                                         reference_house["cooking"] == cooking) &
                                             (reference_house["large_bed"] == large_bed)]["housing_id"].tolist()
            try:
                user_favorite_housing[user] += housing_id_set
            except KeyError:
                user_favorite_housing[user] = housing_id_set
        user_favorite_housing[user] = list(set(user_favorite_housing[user]))

    with open(INITIAL_DATA_PATH + "/recommend.csv", "w") as csv_file:
        writer = csv.writer(csv_file, delimiter=",")
        for user in user_favorite_housing:
            for housing_id in user_favorite_housing[user]:
                writer.writerow([user] + [housing_id])


def overwrite_recommend_table_db(conn):
    # first drop the table
    cur = conn.cursor()
    try:
        drop_query = "drop table %s" % 'Recommend'
        cur.execute(drop_query)
        conn.commit()
    except:
        print("Recommend table has already been dropped!")

    # then create the table
    query_recommend = "create table Recommend (" + \
                      "recommend_id int NOT NULL AUTO_INCREMENT," + \
                      "recommend_username varchar(255) NOT NULL, " + \
                      "recommend_housing_id int NOT NULL," + \
                      "PRIMARY KEY (recommend_id)," + \
                      "FOREIGN KEY (recommend_username) REFERENCES User (username)," + \
                      "FOREIGN KEY (recommend_housing_id) REFERENCES Housing (housing_id)" + \
                      ");"

    try:
        cur.execute(query_recommend)
        conn.commit()
    except:
        print("Recommend table already exists!")

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
    print("Recommend updating done!")


def main():
    # local db
    # conn = pymysql.connect(
    #     host='localhost',
    #     port=3306,
    #     user='root',
    #     passwd='CS411!!!',
    #     db='cs411proj')

    # # aws db
    conn = pymysql.connect(
        host="tutorial-db-web.cjb5il7njevi.us-east-2.rds.amazonaws.com",
        port=3306,
        user="tutorial_user",
        passwd="Zhe12345!",
        db="sample"
    )

    get_data_from_db(conn)
    get_feature_db()
    k_means_recommendation()
    overwrite_recommend_table_db(conn)


if __name__ == "__main__":
    main()
