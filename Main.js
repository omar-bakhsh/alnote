function CreatAccountHandler() {
    var NameVal = document.getElementById('NameSign').value;
    var EmailVal = document.getElementById('EmailSign').value;
    var PassVal = document.getElementById('PassSign').value;



    //Condation Chick Name equals Just Charcters & space .

    var letters = /^[A-Za-z ]+$/;
    if (!NameVal.match(letters)) {

        document.getElementById('NmError').innerHTML = "Name Allow Just Char";

        document.getElementById('NameSign').style.border = 'thick solid  #ff0a0a94';

        setTimeout(() => {

            document.getElementById('NameSign').style.border = '';

            document.getElementById('NmError').innerHTML = "";

        }, 4000);


        return false;
    }
    //Condation Chick Name Length Is Not too long or short  .

    if (NameVal.length > 20) {

        // name border warninig color 
        document.getElementById('NameSign').style.border = 'thick solid  #ff0a0a94';
        // name  error Msg . 
        document.getElementById('NmError').innerHTML = "Use Short Name ";

        //After 4 sic error Removed .
        setTimeout(() => {
            // rremove color error
            document.getElementById('NameSign').style.border = '';
            // remove msg error .
            document.getElementById('NmError').innerHTML = "";
        }, 4000);


        return false;
    };




    // Condation Email Valdation .

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EmailVal)) {
        // email border warninig color 
        document.getElementById('EmailSign').style.border = 'thick solid  #ff0a0a94';
        // email error Msg . 
        document.getElementById('EmlError').innerHTML = "Type Correct Email";


        //After 4 sic error Removed .
        setTimeout(() => {
            document.getElementById('EmailSign').style.border = '';
            document.getElementById('EmlError').innerHTML = "";
        }, 4000)

        return false;
    }
    // Condation Email Length Valdation .

    if (EmailVal.length < 5) {
        document.getElementById('EmailSign').style.border = 'thick solid  #ff0a0a94';
        document.getElementById('EmlError').innerHTML = "Too Short Use Normal Email ";

        //After 4 sic error Removed .
        setTimeout(() => {
            document.getElementById('EmailSign').style.border = '';
            document.getElementById('EmlError').innerHTML = "";

        }, 4000)
        alert('Email is Short')
        return false;
    }





    // Passowrd Valdation .
    //  var  PassSymbol=  /^[A-Za-z]\w{7,14}$/;
    if (PassVal.match("/><\/;:/") || PassVal.length < 8) {


        document.getElementById('PassSign').style.border = 'thick solid  #ff0a0a94';
        document.getElementById('pssError').innerHTML = "use  stronge Passowrd 8 or More.. ";

        //After 4 sic error Removed .
        setTimeout(() => {
            document.getElementById('PassSign').style.border = '';
            document.getElementById('pssError').innerHTML = "";

        }, 4000)
        return false;
    }


    // data form Creating .
    var dataArr = new FormData();

    dataArr.append('creat_account', 'creat_account');
    dataArr.append('add_name', NameVal);
    dataArr.append('add_email', EmailVal);
    dataArr.append('add_pass', PassVal);



    // api fetch post creat account . 
    fetch("https://al-consul.com/noteApi.php", {

        method: "POST",

        body: dataArr

    }).then(function(response) {
        console.log(response.headers.get("Content-Length"))

        if (response.headers.get("Content-Length") == null) {
            console.log(response)
            return response.json();
        } else return { true: 'true' };
    }).then((data) => {
        




            // Check browser support caching 
            if (typeof(Storage) !== "undefined") {
                // Storing Email + ps in Cach 
                localStorage.setItem('email', EmailVal);
                localStorage.setItem('pass', PassVal);

                // export  const global_pass = PassVal;
                // export  const global_email = EmailVal;
            } else {
                console.log("Sorry, your browser does not support Web Storage...");
                // window.location = './Login/LoginP.html';
                    }
                    // After Storing go to App .
                    window.location = './login/app/index.html';
        }


    ).catch((error) => {

        console.log(error)
    });

};