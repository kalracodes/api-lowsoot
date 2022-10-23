const api_key_appolo = "_qsyLO_heHoCL-EZRey-rg";
const api_key_quickemail = 'a251a31187060827a22f4d0c9f9b10acb87d5385ad471bcfe0711e7cdeae'
let file_na = document.getElementById("com-name");
const getBtn = document.getElementById('get-btn');
const lenBtn = document.getElementById('length-btn');
const vlenBtn = document.getElementById('vlength-btn');
const verBtn = document.getElementById('verify-btn');
const showBtn = document.getElementById('Show-leads');
const email_copy = document.getElementById('emailCopy');
const name_copy = document.getElementById('nameCopy');
const title_copy = document.getElementById('titleCopy');
const linkedin_copy = document.getElementById('linkedinCopy');
const data = document.getElementById('dom');
const table_dom = document.getElementById('table-dom');
let company_name = "";
var arr = []
var arraydata = [];
var email = [],
    names = [],
    title = [],
    linkedin_url = [];

file_na.onchange = () => {
    company_name = file_na.value;
}

function dom(str) {
    data.innerHTML = str;
}

function getData() {
    arr = []
    arraydata = []
    if (company_name == "") {
        dom("Add company name");
        return;
    }
    for (let i = 0; i < 3; i++) {
        var settings = {
            "url": "https://api.apollo.io/v1/mixed_people/search?q_keywords=" + company_name + "&page=" + (i + 1) + "&api_key=_qsyLO_heHoCL-EZRey-rg",
            "timeout": 0,
            "methods": "POST",
            "Cache-Control": "no-cache"
        }
        $.ajax(settings).done(function (response) {
            if (response.pagination.total_entries == 0) {
                return;
            }
            console.log(response)
            for (let i = 0; i < response.people.length; i++) {
                if (response.people[i]["email"] != null) {
                    arr.push([response.people[i]["email"], response.people[i]["name"], response.people[i]["title"], response.people[i]["linkedin_url"]]);
                }
            }
        });
    }
    console.log(arr);
}

function arrayLen() {
    dom("No of elements: " + arr.length)
}

function verifyData() {
    if (arr.length == 0) {
        dom("No unverified leads found:")
    }
    for (let i = 0; i < arr.length; i++) {
        var settings = {
            "Access-Control-Allow-Origin": "*",
            "url": "https://api.quickemailverification.com/v1/verify?email=" + arr[i][0] + "&apikey=" + api_key_quickemail,
            "timeout": 0,
            "methods": "GET",
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.safe_to_send == "true") {
                arraydata.push(arr[i]);
            }
        });
    }
    console.log(arraydata)
}

function verarrayLen() {
    dom("No of elements: " + arraydata.length)
}

function showData() {
    email = [];
    title = [];
    linkedin_url = [];
    names = [];
    if (company_name == "") {
        dom("Enter company name first")
        return;
    } else if (arraydata.length == 0) {
        dom("No final leads found")
        return;
    }
    dom(company_name + "-")
    document.getElementById("emailCopy").style.opacity = 1;
    document.getElementById("nameCopy").style.opacity = 1;
    document.getElementById("titleCopy").style.opacity = 1;
    document.getElementById("linkedinCopy").style.opacity = 1;
    var html = "<table>";
    html += "<tr><th>Email</th><th>Name</th><th>Title</th><th>linkedin_url</th><th></tr>"
    for (let i = 0; i < arraydata.length; i++) {
        html += "<tr>"
        for (let j = 0; j < arraydata[i].length; j++) {
            if (j == 0) {
                email.push(arraydata[i][j]);
            } else if (j == 1) {
                names.push(arraydata[i][j]);
            } else if (j == 2) {
                title.push(arraydata[i][j]);
            } else {
                linkedin_url.push(arraydata[i][j]);
            }
            html += "<td>" + arraydata[i][j] + "</td>"
        }
        html += "</tr>"
    }
    html += "</table>"
    table_dom.innerHTML = html;
}

function getEmail() {
    navigator.clipboard.writeText(email.join('\n'))
        .then(() => {
            alert("Email copied successfully")
        })
        .catch(() => {
            alert("Something went wrong! Reload and try again!");
        });
}

function getName() {
    navigator.clipboard.writeText(names.join('\n'))
        .then(() => {
            alert("Name copied successfully")
        })
        .catch(() => {
            alert("Something went wrong! Reload and try again!");
        });
}

function getTitle() {
    navigator.clipboard.writeText(title.join('\n'))
        .then(() => {
            alert("Title copied successfully")
        })
        .catch(() => {
            alert("Something went wrong! Reload and try again!");
        });
}

function getLinkedin() {
    navigator.clipboard.writeText(linkedin_url.join('\n'))
        .then(() => {
            alert("Linkedin Url copied successfully")
        })
        .catch(() => {
            alert("Something went wrong! Reload and try again!");
        });
}

email_copy.addEventListener("click", getEmail);
name_copy.addEventListener("click", getName);
title_copy.addEventListener("click", getTitle);
linkedin_copy.addEventListener("click", getLinkedin);
getBtn.addEventListener('click', getData);
lenBtn.addEventListener('click', arrayLen);
vlenBtn.addEventListener('click', verarrayLen);
verBtn.addEventListener('click', verifyData);
showBtn.addEventListener('click', showData);