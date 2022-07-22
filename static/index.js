window.onload = function(){
    var students = document.getElementById("hidden1").innerHTML;
    document.getElementById("hidden1").style.display = "none";
    var data = JSON.parse(students)
    var attendances = []
    for(var x in data){
        var present = 0
        var absent = 0
        for(var i=0;i<data[x].length;i++){
            if(data[x][i] == "TRUE"){
                present += 1;
            }
        }
        present = Math.round(present/data[x].length*100);
        absent = 100 - present;
        attendance = [present, absent]
        attendances.push(attendance)
    }
    const ctx = document.getElementById('myChart1');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                label: 'Attendance',
                data: attendances[0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var students = document.getElementById("hidden2").innerHTML;
    document.getElementById("hidden2").style.display = "none";
    var data = JSON.parse(students)
    var tests = []
    var students = []
    for(var x in data){
        tests.push(x)
        var obj = data[x];
        var values = Object.keys(obj).map(function (key) { return parseFloat(obj[key]); });
    }
    for(var test in tests){
        students[test] = values[0]
    }
    console.log(students)
    const ctx2 = document.getElementById('myChart2');
    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: tests,
            datasets: [{
                label: 'Grade Point Average',
                data: students,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                base: 0,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var students = document.getElementById("hidden3").innerHTML;
    document.getElementById("hidden3").style.display = "none";
    var data = JSON.parse(students)    
    var tests = []
    var students = []
    for(var x in data){
        tests.push(x)
        var obj = data[x];
        var values = Object.keys(obj).map(function (key) { return obj[key]; });
        console.log(values)
    }
    for(var test in tests){
        students[test] = [values[0], 100-values[0]]
    }
    console.log(students)
    const ctx3 = document.getElementById('myChart3');
    const myChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ['Percentile', 'Difference from ClassTopper'],
            datasets: [{
                label: 'Percentile',
                data: students[test[0]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
