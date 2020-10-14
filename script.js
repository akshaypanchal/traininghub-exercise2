// const { resolveNaptr } = require("dns");
// const { fchown } = require("fs");

var userUrl = "https://traininghub-exercise2.firebaseio.com/user.json";
var teacherUrl ="https://traininghub-exercise2.firebaseio.com/teacher.json";
var para = document.getElementById("student_item");
var node;


 

var searchClass = document.getElementById("searchClass").value;

// Add Data to the Database using function addData
function addData(){
    var userObj = {
        name: document.getElementById("name").value,
        id: document.getElementById("id").value,
        class: document.getElementById("std").value,
        Avg_Marks: document.getElementById("avgMarks").value,
        teacher: document.getElementById("teacher").value
    }

    axios.post(userUrl, userObj)
    .then(function(response){
        getData();
    })
    .catch(function(error){
        alert(error);
    })

    btnClear.addEventListener('click', () => {
        inputs.forEach(input =>  input.value = '');
    });

}


function addChild(item){
    var elemtent = document.createElement("p");
    node = document.createTextNode("ID: "+item.id+" Name: "+item.name+" Class: "+item.class+" Teacher: "+item.teacher+" Average Makrs: "+item.Avg_Marks);
    elemtent.appendChild(node);
    para.appendChild(elemtent);
}

function getData(){
    axios.get(userUrl)
    .then(function(response){
        let table = Object.values(response.data);
        table.map(item=>addChild(item))
    })
    .catch(function(error){
        alert(error);
    })

}



function filterByTeacher(item){

    var searchTeacher = document.getElementById("searchTeacher").value;
    if(item.teacher===searchTeacher){
        addChild(item);
    }
}


function filterByClass(item){

    var searchClass = document.getElementById("searchClass").value;
    if(item.class===searchClass){
        addChild(item);
    }
}

function searchWithTeacher(){

    axios.get(userUrl)
    .then(function(response){
        let result = Object.values(response.data);
        result.map(item=>filterByTeacher(item))
    })
    .catch(function(error){
        alert(error);
    })

}

function searchWithClass(){
    axios.get(userUrl)
    .then(function(response){
        let result = Object.values(response.data);
        result.map(item=>filterByClass(item));
    })
    .catch(function(error){
        alert("error:"+error);
    })

}