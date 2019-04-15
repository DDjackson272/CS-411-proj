import csv
import random
import pandas as pd
import pymysql

FILE_PATH = "./FromDB"
conn = pymysql.connect(
	host='localhost',
	port=3306,
	user='root',
	passwd='CS411!!!',
	db='cs411proj')

def get_data_from_db(conn):
	table_list = ['User', 'Housing', 'HousingFeature', 'History']

	for table in table_list:
		try:
			with conn.cursor() as cursor:
				sql = "select * from %s" % (table)
				cursor.execute(sql)
				result = cursor.fetchall()
				field_names = [i[0] for i in cursor.description]
				res = pd.DataFrame(list(result), columns=field_names)
				res.to_csv(FILE_PATH + "/%s.csv" % (table), index=False)
		except:
			print("%s went wrong!" % table)

def get_feature_db():
	user_table = pd.read_csv(FILE_PATH+"/User.csv")
	housing_table = pd.read_csv(FILE_PATH+"/Housing.csv")
	housing_feature_table = pd.read_csv(FILE_PATH+"/HousingFeature.csv")
	history_table = pd.read_csv(FILE_PATH+"/History.csv")

	history_feature_table = pd.merge(history_table, housing_feature_table, 
		left_on="history_housing_id", right_on="housing_feature_housing_id")[
	["history_user_id", "history_housing_id", "parking", "cooking", "large_bed"]]

	history_feature_table = pd.merge(history_feature_table, housing_table, 
		left_on="history_housing_id", right_on="housing_id")[
	["history_user_id", "housing_id", "housing_type", "parking", "cooking", "large_bed"]]

	length = len(history_feature_table)

	for i in range(length):
		if history_feature_table.at[i, "housing_type"] == "home stay":
			history_feature_table.at[i, "housing_type"] = 1
		elif history_feature_table.at[i, "housing_type"] == "hotel":
			history_feature_table.at[i, "housing_type"] = 0

	history_feature_table.to_csv(FILE_PATH+"/TrainingTable.csv", index=False)


def main():
	get_data_from_db(conn)
	get_feature_db()

if __name__ == "__main__":
	main()