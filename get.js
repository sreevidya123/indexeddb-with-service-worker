var firstname=localStorage.getItem("fname");






if (!window.indexedDB) {
  console.log("indexed db is not working......!");
}
var request=window.indexedDB.open("svitDb",1);
request.onerror=(e)=>{
  console.log(e);
}
request.onupgradeneeded=e=>{
  var dbname=e.target.result;
dbname.createObjectStore("cse",{keyPath:"name"});
  console.log("upgraded");
}
request.onsuccess=e=>{
  var dbname=e.target.result;
  store=dbname.transaction("cse","readwrite").objectStore("cse");
var data=store.get(firstname);
console.log(data);
data.onsuccess=e=>{
  var res=e.target.result;
  var main=document.getElementById("mainDiv");
  var left=document.createElement("div");
  left.classList.add("leftDiv");
  var sname=document.createElement("h3");
  sname.textContent=res.name;
  left.appendChild(sname);
  main.appendChild(left);
  var hr=document.createElement("hr");
  left.appendChild(hr);
  var roll=document.createElement("p");
  roll.textContent=res.rollno;
  left.appendChild(roll);
  var email=document.createElement("p");
  email.textContent=res.email;
  left.appendChild(email);
  var mobile=document.createElement("p");
  mobile.textContent=res.mobileno;
  left.appendChild(mobile);

var right=document.createElement("div");
right.classList.add("rightDiv");
var co=document.createElement("p");
co.textContent=res.co;
right.appendChild(co);
main.appendChild(right);
var hr=document.createElement("hr");
right.appendChild(hr);
}

  console.log("sucess.......!");
}
