import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import csv
from sklearn.cluster import KMeans

FILE_PATH = "./FromDB"
INITIAL_DATA_PATH = "./initial"
CLUSTER_NUM = 2

def k_means_recommendation():
	user_id_name = dict()
	user_favorite_type = dict()
	user_favorite_housing = dict()
	train_data = pd.read_csv(FILE_PATH+"/TrainingTable.csv")
	user_table = pd.read_csv(FILE_PATH+"/User.csv")[["user_id", "username"]]
	reference_house = pd.read_csv(FILE_PATH+"/FinalHousingFeature.csv")
	user_list = list(set(train_data['history_user_id'].tolist()))
	for user in user_list:
		username = user_table[user_table["user_id"]==user]["username"].tolist()[0]
		train_user_data = np.array(train_data[train_data['history_user_id']==user][
			["housing_type", "parking", "cooking", "large_bed"]])
		kmeans_user = KMeans(n_clusters=CLUSTER_NUM).fit(train_user_data)
		user_favorite_type[username]=np.round(kmeans_user.cluster_centers_).tolist()

	for user in user_favorite_type:
		for value in user_favorite_type[user]:
			housing_type = int(value[0])
			parking = int(value[1])
			cooking = int(value[2])
			large_bed = int(value[3])
			housing_id_set = reference_house[(reference_house["housing_type"]==housing_type) &\
			 (reference_house["parking"]==parking) & (reference_house["cooking"]==cooking) &\
			 (reference_house["large_bed"]==large_bed)]["housing_id"].tolist()
			try:
				user_favorite_housing[user] += housing_id_set
			except KeyError:
				user_favorite_housing[user] = housing_id_set
		user_favorite_housing[user] = list(set(user_favorite_housing[user]))

	with open(INITIAL_DATA_PATH+"/recommend.csv", "w") as csv_file:
		writer = csv.writer(csv_file, delimiter=",")
		for user in user_favorite_housing:
			for housing_id in user_favorite_housing[user]:
				writer.writerow([user] + [housing_id])

