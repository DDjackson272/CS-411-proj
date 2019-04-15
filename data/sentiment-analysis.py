from textblob import TextBlob
import csv
import numpy as np

filename = "comment.csv"
# with open(filename,encoding='utf8') as f:
#  text = f.read()
with open(filename,encoding='utf8') as csvfile:
    reader = csv.reader(csvfile)
    Id = [row[0] for row in reader]


with open(filename,encoding='utf8') as csvfile:

    reader = csv.reader(csvfile)
    Comment=[row[2] for row in reader]

result=np.array(list(zip(Id,Comment)))


allComment=[]
commentForOne=[]
positiveComment=0
neutralComment=0
negativeComment=0


size=(20,3)
rating=np.zeros(size) #  Number of positiveComment,neutralComment,negativeComment for 20 houses

for i in range(result.shape[0]):
	commentForOne.append(result[i][1])
	
	blob = TextBlob(str(result[i][1]))

	polarity,subjectivity=blob.sentences[0].sentiment[0],blob.sentences[0].sentiment[1]
	if polarity>=0.5:
		positiveComment+=1
	elif polarity<=-0.5:
		negativeComment+=1
	else:
		neutralComment+=1
	i+=1

	if i!=0 and i%10==0:
		allComment.append(commentForOne)
		commentForOne=[]
		rating[i//10-1]=positiveComment,neutralComment,negativeComment
		positiveComment=0
		neutralComment=0
		negativeComment=0

#print (np.arange(1,21))
print (rating)   # Number of positiveComment,neutralComment,negativeComment for 20 houses
print(rating[:,0])


#Overall comment for each house
overallComment=[]
for each in allComment:
	temp=""
	blob = TextBlob(str(each))
	avg_polarity=blob.sentiment[0]
	if avg_polarity>0.45:
		temp="Excellent"
	elif avg_polarity>0.35:
		temp="Great"
	elif avg_polarity>0.2:
		temp="Good"
	elif avg_polarity>0.05:
		temp="Average"
	else:
		temp="Terrible"
	overallComment.append(temp)

#print(overallComment)


with open("processed.csv","w") as csvfile: 
    writer = csv.writer(csvfile)

    writer.writerow(["house_id","positiveComment","neutralComment","negativeComment","overallComment"])
    
    for  each in zip(np.arange(1,21),rating[:,0],rating[:,1],rating[:,2],overallComment):
    	print(each)

    	writer.writerows([each])



# print(blob.sentences[1],blob.sentences[1].sentiment)
# print(blob.sentences[2],blob.sentences[2].sentiment)
# print(blob.sentences[3],blob.sentences[3].sentiment)
# print(blob.sentences[4],blob.sentences[4].sentiment)
# print(blob.sentences[5],blob.sentences[5].sentiment)


# blob.sentences[1].sentiment
# blob.sentiment

