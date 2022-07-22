from helpers.googleSheetConnector import getData
import sheetsVariables
from flask import Flask, render_template, request
import pandas as pd
import json

app = Flask(__name__)
# def getClassLinks():
#     data = getData(sheetsVariables.schoolReferenceSheetId, sheetsVariables.schoolReferenceSheet)
#     return pd.DataFrame(data[1:], columns=data[0])

def getAttendance():
    data = getData(sheetsVariables.schoolReferenceSheetId, sheetsVariables.attendanceSheet)
    return data

def getMarks():
    data = getData(sheetsVariables.schoolReferenceSheetId, sheetsVariables.assessmentActiveSheet)
    return [data, sheetsVariables.assessmentActiveSheet]



@app.route('/')
def hello():
    if request.method == 'GET':
        df1 = getAttendance()
        df2, tests = getMarks()
        students = {}
        for i in range(1, len(df1)):
            student = {}
            student[df1[i][0]] = []
            for j in range(1, len(df1[i])):
                student[df1[i][0]].append(df1[i][j])
            students.update(student)
        # print(students)   
        data1 = json.dumps(students)
        test = [int(i) for i in tests.split() if i.isdigit()]
        testID = test[0]
        students = {}
        students[test[0]] = {}
        gpas = {}
        for i in range(2, len(df2)):
            gpas[df2[i][1]] = df2[i][len(df2[i])-2]
        
        students[test[0]].update(gpas) 
        
        data2 = json.dumps(students)
        
        students = {}
        students[test[0]] = {}
        percentiles = {}
        for i in range(2, len(df2)):
            percentiles[df2[i][1]] = int(df2[i][len(df2[i])-1])/(len(df2)-2)*100
        
        students[test[0]].update(percentiles) 
        
        data3 = json.dumps(students)
        print(df2)
        return render_template("index.html", data = [data1, data2, data3])
       
if __name__ == '__main__':
 
    app.run()