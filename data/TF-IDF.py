import csv
import heapq
import math

token = set([',','.','?','\'','!','(',')','\"',':','-','&','’'])
words = set(['a','would','the','i','he','she','to','has','is','was','were','are','must','should','and','with','','this','that','you','for',
             'we','host','hosts','very','place','there','second','third','room','his','her','off','up','s','m','\’ ','don\'t','it','via',
             'call','phone','beds','bed','pollow','l1','told','speak','speaks','dont','may','whole','front','don','planning','do','last',
             'reply','him','ll','share','hour','eat','bit','yourself','within','we','re'
            ])

def getComment(filename):
    csvFile = open(filename,'r')
    reader = csv.reader(csvFile)
    result = {}
    for item in reader:
        if reader.line_num == 1:
            continue
        else:
            if item[1] not in result:
                result[item[1]] = item[3].lower()
            else:
                tmp = result[item[1]] + item[3].lower()
                result[item[1]] = tmp
    return result


def tokenFilter(token,result):
    for i in result:
        tmp = result[i]
        out = ''
        for j in range(len(tmp)):
            if tmp[j] not in token:
                out += tmp[j]
            else:
                out += ' '
        result[i] = out   
    return result

def stopWords(words,result):
    for i in result:
        tmp = result[i]
        out = ''
        for j in range(len(tmp)):
            if tmp[j] not in words:
                out += tmp[j]
            else:
                out += '  '
        result[i] = out   
    return result

def countKey(result):
    glb_buf ={}
    indiv_buf = []
    for i in result:
        buf = {}
        tmp_output = []
        item = result[i]
        tmp = item.split(' ')
        for j in range(len(tmp)):
            if tmp[j] not in buf and tmp[j] not in words:
                if tmp[j-1] == 'not':
                    str_tmp = 'not '+tmp[j]
                    buf[str_tmp] = 1
                else:
                    buf[tmp[j]] = 1
            elif tmp[j] not in words:
                if tmp[j-1] == 'not':
                    str_tmp = 'not '+tmp[j]
                    buf[str_tmp] = 1
                else:
                    buf[tmp[j]] += 1
#         for key in buf:
            
        indiv_buf.append(buf)
        for j in buf:
            if j not in glb_buf:
                glb_buf[j] = buf[j]
            else:
                glb_buf[j] += buf[j]
    return glb_buf,indiv_buf

def IDF(indiv_buf):
    output = []
    for i in range(len(indiv_buf)):
        numOfwords = 0
        for key in indiv_buf[i]:
            numOfwords += indiv_buf[i][key]
        for key in indiv_buf[i]:
            count = 0          
            for tmp in indiv_buf:
                if key in tmp:
                    count += 1
            indiv_buf[i][key] = indiv_buf[i][key]/numOfwords * math.log(len(indiv_buf)/count,10)
    return indiv_buf
def findMax(indiv_buf,k):
    output = []
    for item in indiv_buf:
        heap = []
        count = 0
        for key in item:
            if count < k:
                heapq.heappush(heap,(item[key],key))
                count += 1
                continue
            else:
                heapq.heappush(heap,(item[key],key))
                heapq.heappop(heap)
        output.append(heap)
    return output

filename = 'comment.csv'

global_key = {}
result = getComment(filename)
result = tokenFilter(token,result)
glb_buf,indiv_buf = countKey(result)
indiv_buf = IDF(indiv_buf)

output = findMax(indiv_buf,5)

for i in output:
    print(i)

        