window.onload = function() {
    // whene window load once .
    Load_Note();
    // load every 60 sic from  enterval .
    function foo() {



        // window.innerWidth <900?console.log("Download App"):console.log(  window.innerWidth );
        // Check browser support caching 
        if (typeof(Storage) !== "undefined") {
            // Storing Email + ps in Cach 
            var notEml = localStorage.getItem('email');
            var notPs = localStorage.getItem('pass');


        } else {
            console.log("Sorry, your browser does not support Web Storage...");

        }
        Load_Note();
    }
    try {
        document.createEvent("TouchEvent");
        if (screen.width<700)
      if (window.location = 'https://play.google.com/store/apps/details?id=com.alconsul.alnote&hl=en') { 
  window.open("Download.html", "Thanks for Visiting!");
}
    } catch (e) { return true; }
    setInterval(foo, 6000);
}

var form = document.getElementById('Note_form');
var title = document.getElementById('inpt_title');
// export  const global_pass = PassVal;
// export  const global_email = EmailVal;


// clear form title + conent .
function clearFormFun() {
    document.getElementById('clearForm').style.cssText = "padding:3px;";
    document.getElementById('Note_form').value = "";

    document.getElementById('inpt_title').value = "";
}



// note Upload Function .
function Load_Note() {
    // body...

    // Check browser support caching 
    if (typeof(Storage) !== "undefined") {
        // Storing Email + ps in Cach 
        var notEml = localStorage.getItem('email');
        var notPs = localStorage.getItem('pass');


    } else {
        console.log("Sorry, your browser does not support Web Storage...");

    }

    // Array fillied by api response data .
    var resArr = [];
    // data form Creating .
    var dataArr = new FormData();
    // dataArr.append('insertNoteCloud', 'insertNoteCloud');
    dataArr.append('email_login', notEml);
    dataArr.append('pass_login', notPs);
    // dataArr.append('title_note', 'hhhhb');
    // dataArr.append('content_note', 'jijjn');
    dataArr.append('getdata', 'getdata');
    dataArr.append('dir_note', '1');

    // api fetch post Login  . 
    fetch("https://al-consul.com/noteApi.php", {
        method: "POST",

        body: dataArr
    }).then(function(response) {
        // parsing response to js.
        return response.json();
    }).then((data) => {
        console.table(data)

        for (var i = 0, len = data.length; i < len; i++) {
            var res = data[i];
            resArr.push({
                'title': res['title'],
                'content': res.content,
                'NT_ID': res.NT_ID,
                'date': res.date,
                'dir': res.dir
            })
        }
        console.table(resArr)


        //   arry filled data to doc list.
        //left div
        var cloud_container = document.getElementById('OnlineNotes');
        //chick if has  old ol 
        cloud_container.children.length > 0 ? cloud_container.innerHTML = '' : console.log("GOOD no old ol");
        // creating <ol>  .
        var ol = document.createElement("ol");
        // adding ol to left div .
        cloud_container.appendChild(ol);
        // adding id to ol 
        ol.setAttribute("id", "ul_list");

        // cloud_container.children.length > 2 ? cloud_container.scrollLeft = 20:console.log(loud_container.children.length) 

        // chicking if all okay .
        console.log(cloud_container);


        // chick if has old ol .
        ol.length > 0 ? ol.innerHTML = '' : console.log("GOOD no old li");
        // loop data array .
        resArr.forEach(function(e) {

            // console.log(resArr[i]['title']);
            var li = document.createElement("li");
            // adding <li> to <ol> .
            document.getElementById('ul_list').prepend(li);
            // adding id to li . 
            li.setAttribute("id", e.NT_ID);
            li.setAttribute("title","Click To Edite");
            // adding title and content inside <p> in <li> .  
            li.innerHTML = `${e.title}\n <span title="contant">${e.content}</span> `;
            /*pass id of li To update Function*/
            li.addEventListener("click", function(e) {
                // chick if click was on li 
                if (e.target == this) {
                    UodateNote(e.target);
                }
            });
        });

        // CALL FUN FOOTER MSG UPLADED . 
        // uploadStaste();

    }).catch((error) => { console.log("fech error", error) });




    /*upload fun End */
};



//  creat new note fun 

function creatNote() {
    // body...

    // Check browser support caching 
    if (typeof(Storage) !== "undefined") {
        // Storing Email + ps in Cach 
        var notEml = localStorage.getItem('email');
        var notPs = localStorage.getItem('pass');


    } else {
        console.log("Sorry, your browser does not support Web Storage...");

    }

    // title value
    let ttle = document.getElementById('inpt_title').value;
    // content value
    let cntnte = document.getElementById('Note_form').value;
    // chick title not empty .
    if (ttle.length < 1) { return false; }
    // chick conent  not empty .
    if (cntnte.length < 1) { return false; }

    console.log("okaaaay");
    // data form Creating .
    var dataArr = new FormData();
    dataArr.append('insertNoteCloud', 'insertNoteCloud');
    dataArr.append('email_login', notEml);
    dataArr.append('pass_login', notPs);
    dataArr.append('title_note', ttle);
    dataArr.append('content_note', cntnte);
    dataArr.append('dir_note', '1');
    //update Start 



    // api fetch post Login  . 
    fetch("https://al-consul.com/noteApi.php", {
        method: "POST",

        body: dataArr
    }).then(() => {
        Load_Note();

        setTimeout(function() { uploadStaste(); }, 2500);
    }).catch((error) => { console.log("CREAT NOT POST Error", error) });
}


// green state
function uploadStaste() {
    // body...
    console.log("from state fun ");
    var status = document.querySelector('.statusPopup');
    status.style.cssText = "bottom:10px;display:block;";
    setTimeout(function() { status.style.cssText = "bottom:-50px;display:none;" }, 2000);

}


var UpdtSwitch = false;
// update note  to edite 
function UodateNote(e) {
    //body 
    let bdy = document.getElementsByTagName("body")[0];
    //chick for hiden id of note 
    let bdy_nested = bdy.querySelector("#li_id_UodateNote");

    // chick if has old hiden id of note and remove .  
    bdy_nested !== null ? bdy.removeChild(bdy_nested) : console.log("GOOD no old li id");
    // creat div has id of note to save global .
    let nt_id = document.createElement("div");
    // append container to duc.
    document.body.appendChild(nt_id);
    nt_id.id = "li_id_UodateNote";
    // add id number as li_id_UodateNote value . 


    nt_id.innerHTML = e.id;


    // hide the ider.
    nt_id.style.display = "none";




    // add li frorm to input to edite - e.content  is li string ;
 document.getElementById('Note_form').value = e.firstElementChild.textContent;
   
  
  // replase span to empty & get val of li . 
    var ttil = e.innerText.replace(e.firstElementChild.innerText,'');
    document.getElementById('inpt_title').value = ttil;

}



// upedate note api
function updateNote(argument) {
    // body...
    // Check browser support caching 
    if (typeof(Storage) !== "undefined") {
        // Storing Email + ps in Cach 
        var notEm = localStorage.getItem('email');
        var notP = localStorage.getItem('pass');


    } else {
        console.log("Sorry, your browser does not support Web Storage...");

    }
    // title value
    let ttl = document.getElementById('inpt_title').value;
    // content value
    let cont = document.getElementById('Note_form').value;

    let id_note_Updt = document.querySelector("#li_id_UodateNote").innerText;


    // chick title not empty .
    if (ttl.length < 1) { return false; }
    // chick conent  not empty .
    if (cont.length < 1) { return false; }

    // data form Creating .
    var dataAr = new FormData();
    dataAr.append('updateNote', 'updateNote');
    dataAr.append('email_login', notEm);
    dataAr.append('pass_login', notP);
    dataAr.append('title_note', ttl);
    dataAr.append('content_note', cont);
    dataAr.append('dir_note', '1');
    dataAr.append('id_note', id_note_Updt);
    //update Start 

    // api fetch post Login  . 
    fetch("https://al-consul.com/noteApi.php", {
        method: "POST",

        body: dataAr
    }).then((res) => {
        console.log("updated");
        Load_Note();
        setTimeout(function() { uploadStaste(); }, 2500);
        return res.then((text) => {})
    }).catch((error) => { console.log("update NOT POST Error", error) });
}






// tool: Copy Note Form + Note Title .
function Copy_Note() {

    // title and cotant value .
    var copyTextarea = title.value + '\n' + form.value;
    // creat Conatiner . 
    var dummy = document.createElement("textarea");
    // append container to duc.
    document.body.appendChild(dummy);
    // get conatiner value . 
    dummy.value = copyTextarea;
    // select value . 
    dummy.select();
    // try to coppy for web sepport .
    try {
        var msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
        console.log('Copying copyTextarea command was ' + msg);
        // if coped ADD class ANMATION . 
        document.getElementById("copy_btn").className = "rotated";

    } catch (err) {
        alert('Whoops, unable to copy');
    }
    // remove fak container .
    document.body.removeChild(dummy);
    // remove class ANMATION from copy btn .
    setTimeout(function() {
        document.getElementById("copy_btn").classList.remove("rotated");
    }, 1000);




}


//  DropDown fun Start .

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// symbole add to note .

var childs = document.getElementById('myDropdown').children; //returns a HTMLCollection

for (var indx = 0; indx < childs.length; indx++) {
    // iterate over it
    childs[indx].onclick = function() {
        // attach event listener On Symbole Dive THIS . 
        this.style.color = "#ff0000";
        // add to note form the symbole .
        document.getElementById("Note_form").value += this.innerHTML;


    }
}
// note form font size.
function fontSizSelct() {
    // body...
    let e = document.getElementById('font_sizes');

    let fontSz = e.options[e.selectedIndex].value;

    document.getElementById("Note_form").style.fontSize = `${fontSz}px`;
};


// note form: font family.
function fontFamilySelct() {

    let p = document.getElementById('font_familys');

    let fontF = p.options[p.selectedIndex].value;

    document.getElementById("Note_form").style.fontFamily = `${fontF}`;
};


//them fun 

// get checkbox 
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

//get currentTheme 
const currentTheme = localStorage.getItem('theme');

// if current them is light  set current them as attr to html .
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    // if current them is dark  set chickbox true .
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
// swich theme call on chickbox change .
function switchTheme(e) {
    //if chickbox chiked . 
    if (e.target.checked) {
        //if html attr is dark add to local storage .
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    // else add the html attr to default light and store in local storage theme is dark . 
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// event on swich .
toggleSwitch.addEventListener('change', switchTheme, false);



// FUN CHING * TO DOT .
// function note_Edite(ish) {

//     // Insert modified string in paragraph
//     document.getElementById("Note_form").value = ish.replace("*", "•");
//     console.log('on inpt from note_Edite() ');
// };


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function DropDownSetting(e) {
    let sb = document.querySelector(".Drp-sitting-container")
    let sub = sb.querySelector("div");
    // sub is container of sitteng -- fun show when mouse enter .
    sub.style.cssText = "display:block; border-radius: 10px;padding:10px;top:10px;text-align:center;right:-25px;background-color: silver; width:140px;height:280px;position : absolute;overflow :auto; z-index: 1;";
    // log out show;
    document.querySelector("#dv_Log_out").style.cssText = "position: absolute;display: inline-block;";
}

// Close the dropdown 
function EndDrpDonSetting() {
    let sbC = document.querySelector(".Drp-sitting-container")
    let subC = sbC.querySelector("div");

    sbC.style.cssText = "position: absolute; background-color: transparent;font-size:22px;right: 30px;width: 40 px;height: 30 px;";
    subC.style.cssText = "display:none;";
    // log out hide;
    document.querySelector("#dv_Log_out").style.cssText = "display:none;";
}
// fun font right to left switch.
function fontRightToLeft() {
    let tItle = document.getElementById('inpt_title');

    // content value
    let fOrm = document.getElementById('Note_form');

    //default left to right .

    switch (tItle.dir) {
        case "rtl":
            tItle.setAttribute('dir', 'ltr');
            fOrm.setAttribute('dir', 'ltr');
            break;
        case "ltr":
            tItle.setAttribute('dir', 'rtl');
            fOrm.setAttribute('dir', 'rtl');
            break;
        default:
            tItle.setAttribute('dir', 'ltr');
            fOrm.setAttribute('dir', 'ltr');
    }

}










// delet fun 
function del() {

    // Check browser support caching 
    if (typeof(Storage) !== "undefined") {
        // Storing Email + ps in Cach 
        var notEml = localStorage.getItem('email');
        var notPs = localStorage.getItem('pass');


    } else {
        console.log("Sorry, your browser does not support Web Storage...");

    }

    if (!document.querySelector("#ul_list ") === true) {


        console.clear();
        return false;
    }

    // get all li from ol


    var lest = document.querySelector("#ul_list ").getElementsByTagName("li");

    // loop all li .
    for (let i = 0; i < lest.length; i++) {

        // creat div
        var notBskt = document.createElement('Div');

        //add class to notBskt 
        notBskt.classList.add('liBsktDiv');

        notBskt.title="delete this NOTE";
        // chick if li  has old div and  removed .
        lest[i].children.length > 1 ? lest[i].removeChild('div') : console.log("GOOD no old li div");
        // add div 
        lest[i].appendChild(notBskt);



        //Event on Eeach Li (div) that has delet baskit   &&  fun post del .
        lest[i].querySelector(".liBsktDiv ").onclick = function() {
            console.log("deleted", lest[i].id);



            var li_id = lest[i].id;

            var dataArr_del = new FormData();
            dataArr_del.append('delettNoteCloud', 'delettNoteCloud');
            dataArr_del.append('email_login', notEml);
            dataArr_del.append('pass_login', notPs);
            dataArr_del.append('id_note', li_id);


            // api fetch post Login  . 
            fetch("https://al-consul.com/noteApi.php", {
                method: "POST",

                body: dataArr_del
            }).then(() => {
                Load_Note();

                setTimeout(function() { uploadStaste(); }, 2500);
            }).catch((error) => { console.log("DELET Note POST Error", error) });


            /* end  onclick evnt  */
        }
        /* end  first li loop  */
    }


    /* end  del fun  */
}


//resize divs
//switch 
let DvSwitch = true;
// btn extand div 
function makeResizableDiv() {
    //event is onclick btn
    // left dv
    const leftDiv = document.querySelector("#OnlineNotes");
    //right dv
    const rightDiv = document.querySelector("#NoteCloud");
    const btnPosition=document.querySelector("#btn-position");
    // condtion if true close 
    if (DvSwitch) {
        rightDiv.style.width = 98.2 + '%';
        leftDiv.style.width = 1 + '%';
        btnPosition.style.cssText ='float:left;  margin-left: -0.5%;';
        DvSwitch = false;
        document.querySelector("#size_arrow_img").src = "./assest/right-arrow.svg";
    }
    // condtion if false open. 
    else {
        rightDiv.style.width = 71.5 + '%';
        leftDiv.style.width = 27.5 + '%';
          btnPosition.style.cssText ='float:left;  margin-left: 26%;';
        DvSwitch = true;
        document.querySelector("#size_arrow_img").src = "./assest/left-arrow.svg";
    }

    console.log("muose position : ", event.clientX);


}
// on mouse over btn creat note show update btn.
function ShowUpdatBtn() {
    // body...
    document.querySelector("#update-Btn").style.display = "inline-block";
}
// on mouse leave btn update note this hide .
function HideUpdatBtn() {
    // body...
    document.querySelector("#update-Btn").style.display = "none";
}

//logout fun
function LogOut() {
    localStorage.clear()

    window.location.replace("https://al-consul.com/alnote/login/");
}