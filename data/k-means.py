import csv
import random 
import numpy as np
import pandas as pd

K = 2  # The number of 
EPOCH = 50


def getComment(filename):
    csvFile = open(filename,'r')
    reader = csv.reader(csvFile)
    result = []
    for item in reader:
        if reader.line_num == 1:
            continue
        else:
            tmp =[]
            for i in range(2,len(item)):
                tmp.append(int(item[i]))
            result.append(tmp)
    return result

def getComment1(filename):
    csvFile = open(filename,'r')
    reader = csv.reader(csvFile)
    result = []
    for item in reader:
        if reader.line_num == 1:
            continue
        else:
            tmp =[]
            for i in range(2):
                tmp.append(int(item[i]))
            result.append(tmp)
    return result

def initial(points,K):
    centers = []
    dim = len(points[0])
    centers = random.sample(points,K)
    return centers

def classifier(points, centers):
    classSheet = []
    for point in points:
        center = np.array(centers[0])
        point = np.array(point)
        flag = 0
#         print(center)
#         print(point)
        distance = np.sum((point - center)**2)
        for i in range(1,len(centers)):
            center = centers[i]
            tmp = np.sum((point - center)**2)
            if tmp < distance:
                flag = i
        classSheet.append(flag)
    return classSheet

def updateCenters(points,classSheet,K):
    centers = np.zeros((K,len(points[0])))
    cnt = np.zeros(K)
#     print(centers)
    for i in range(len(points)):
        point = np.array(points[i])
        classBlongto = classSheet[i]
        centers[classBlongto] += point
        cnt[classBlongto] += 1
    for i in range(K):
        if cnt[i] != 0:
            centers[i] /= cnt[i] 
    return centers


filename = 'TrainingTable.csv'
points = getComment(filename)
index = getComment1(filename)
# points = np.random.random_sample([500,4])
centers = initial(points,K)
classSheet = classifier(points,centers)
for i in range(EPOCH):
    centers = updateCenters(points,classSheet,K)
    classSheet = classifier(points,centers)
#     print(centers)
# output = list(points)[:,1]
# for i in range(len(classSheet)):
#     output[i].append(classSheet[i])
classSheet = list(classSheet)
# print(classSheet)
a = [x[0] for x in index]
b = [x[1] for x in index]
dataframe = pd.DataFrame({'history_user_id':a,'housing_id':b,'class':classSheet})
dataframe.to_csv("classes.csv",index=False,sep=',')