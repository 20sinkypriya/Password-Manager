//Logic to fill the table
const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No Data to Show";
  } else {
    tb.innerHTML = `<tr>
          <th>Website</th>
          <th>Username</th>
          <th>Password</th>
          <th>Delete</th>
        </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      str += `<tr>
        <td>${element.website}<img src="./copy.svg" alt="Copy Icon" onclick="copyTxt('${element.website}')">
        </td>
        <td>${element.username}<img src="./copy.svg" alt="Copy Icon" onclick="copyTxt('${element.username}')">
        </td>
        <td>${maskPassword(element.password)}<img src="./copy.svg" alt="Copy Icon" 
        onclick="copyTxt('${element.password}')">
        </td>
        <td><button class="delbtn" onclick="deletePassword('${element.website}')" >Delete</button></td>
        </tr>`;
    }
    tb.innerHTML += str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

//Logic to mask the password
function maskPassword(pass){
    let str = ""
    for(let i = 0; i < pass.length; i++){
        str += "*"
    }
    return str
}

// Logic to copy data
const copyTxt = (txt) => {
   navigator.clipboard.writeText(txt).then(
    () => {
        document.getElementById("alert").style.display = "inline"
        setTimeout(()=>{
            document.getElementById("alert").style.display = "none"
        },2000)
    },
    () => {
        document.getElementById("copy").style.display = "none"
    }
   )   
}

// Logic to delete a record
const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  var arrUpdated = arr.filter((e) => {
    return e.website !== website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  showPasswords();
};

// Logic to create a new record
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  let passwords = localStorage.getItem("passwords");
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords();
});