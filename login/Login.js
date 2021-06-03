 // window.onpaint = GetSesons();

 // function GetSesons() {
 //     // Check browser support caching 


 //     if (typeof(Storage) !== "undefined") {
 //         // cached Account 
 //         // Retrieve
 //         var CachEmail =   localStorage.setItem('email', lEmail);

 //         document.getElementById("loginEmail").value = CachEmail;

 //     } else {
 //         console.log("Sorry, your browser does not support Web Storage...");
 //     }

 // }




 function loginHandler() {
     var lPass = document.getElementById('loginPass').value;
     var lEmail = document.getElementById('loginEmail').value;
     console.log("Log in Called", lEmail, lPass);


     // Condation Email Valdation .
     // old !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(lEmail)) {

         document.getElementById('login_Eml_Error').innerHTML = 'Plz type Correct Email';
         document.getElementById('loginEmail').style.border = 'thick solid  #ff0a0a94';
         //After 4 sic error Removed .
         setTimeout(() => {
             //remove error Msg . 
             document.getElementById('login_Eml_Error').innerHTML = "";
             //  remove warnning color  .
             document.getElementById('loginEmail').style.border = '';
         }, 4000);

         return false;
     }
     // Condation Email Length Valdation .
     console.log(lEmail.length)
     if (lEmail.length < 5) {

         document.getElementById('login_Eml_Error').innerHTML = 'Email is Short use Normal Email';
         document.getElementById('loginEmail').style.border = 'thick solid  #ff0a0a94';
         //After 4 sic error Removed .
         setTimeout(() => {
             //remove error Msg . 
             document.getElementById('login_Eml_Error').innerHTML = "";
             //  remove warnning color  .
             document.getElementById('loginEmail').style.border = '';
         }, 4000);
         return false;
     }

     // Passowrd Valdation .

     // var PassSymbol = /^[A-Za-z]\w{7,14}$/;
     if (lPass.match("/><\/;:/") || lPass.length < 8) {

         document.getElementById('login_pss_Error').innerHTML = 'use Passowrd longer & ,Allowed  Symbole is (. _ )'
         document.getElementById('loginPass').style.border = 'thick solid  #ff0a0a94';

         //After 7 sic error Removed .
         setTimeout(() => {
             //remove error Msg . 
             document.getElementById('login_pss_Error').innerHTML = "";
             //  remove warnning color  .
             document.getElementById('loginPass').style.border = '';
         }, 7000);
         return false;
     }


     // data form Creating .
     var dataArr = new FormData();

     dataArr.append('email_login', lEmail);
     dataArr.append('pass_login', lPass);
     dataArr.append('getdata', 'getdata');


     // api fetch post Login  . 
     fetch("https://al-consul.com/noteApi.php", {
             method: "POST",
             body: dataArr
         })
         .then((response) => response.json())
         .then((data) => {
             // if Api true 

             // Check browser support caching 
             if (typeof(Storage) !== "undefined") {
                 // Storing Email + ps in Cach 
                 localStorage.setItem('email', lEmail);
                 localStorage.setItem('pass', lPass);


             } else {
                 console.log("Sorry, your browser does not support Web Storage...");
                 // window.location = './Login/LoginP.html';
             }

             // After Storing go to App .
             window.location = './app/index.html';
         })
         .catch((error) => {
             console.log(error)
             document.getElementById('login_pss_Error').innerHTML = 'No Account Found For This Email. \n \t Retry ,or Sign';
             document.getElementById('loginEmail').style.border = 'thick solid  #ff0a0a94';
             document.getElementById('loginPass').style.border = 'thick solid  #ff0a0a94';
             setTimeout(() => {
                 //remove error Msg . 
                 document.getElementById('login_pss_Error').innerHTML = "";
                 //  remove warnning color  .
                 document.getElementById('loginPass').style.border = '';
                 //remove error Msg . 
                 document.getElementById('login_Eml_Error').innerHTML = "";
                 //  remove warnning color  .
                 document.getElementById('loginEmail').style.border = '';
             }, 10000);
         });
 }