const apiURL = 'https://jsonplaceholder.typicode.com/';

var page_object = {
    count : 100, //всего записей
    cnt : 10, //сколько отображаем сначала
    cnt_page : function() {
          return Math.ceil(this.count / this.cnt);
          },   //кол-во страниц
    page : "",
    paginator : null,
    main_page : null,
    div_num : {}
};

function load_post (url_input) {
    axios.get(url_input)
        .then(function (response) {
            manipulation(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function load_user (parent,p_id ) {
    const url_input = apiURL +'users?&id=' + p_id;
    axios.get(url_input)
        .then(function (response) {
            handle_user(response.data,parent,p_id);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function load_comments (parent,p_id ) {
    const url_input = apiURL +'comments?&postId=' + p_id;
    axios.get(url_input)
        .then(function (response) {
            handle_comments(response.data,parent,p_id);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function insert_elemets(id, title, body, user_id) {
    var newDiv = document.createElement('div');
    newDiv.id = 'newDiv'+id;
    newDiv.className = 'num';
    newDiv.style.position = 'relative';
    newDiv.setAttribute('data-num', id);

    newDiv.style.fontWeight = 'bold';
    var newTitle = document.createElement('p');
    newTitle.className = 'name';
    var newBody = document.createElement('p');
    var newBtn = document.createElement('button');
    var newBtnCom = document.createElement('button');

    newTitle.innerHTML = title + '</br>';
    newBody.innerHTML = body + '</br>';
    newBody.style.fontWeight = 'normal';
    newBtn.innerHTML =  'User';
    newBtn.className = 'btn btn-primary btn-mar';
    newBtn.id = 'newBtn'+id;
    newBtn.addEventListener('click', () => load_user(newDiv, id) );
    newBtnCom.innerHTML =  'Comments';
    newBtnCom.className = 'btn btn-primary btn-mar';
    newBtnCom.id = 'newBtnCom'+id;
    newBtnCom.addEventListener('click', () => load_comments(newDiv, id) );
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newBody);
    newDiv.appendChild(newBtn);
    newDiv.appendChild(newBtnCom);

    return newDiv;
}


function DownLoadPosts() {
  load_post(apiURL+ 'posts');
  var btn = document.getElementById('btn_load');
  btn.classList.add("disabled");
}



function Close_user(v_id) {
    var w = document.getElementById('newDivPop' + v_id);

    if (w) {
        w.remove();
    } ;
}

function handle_user(arr_input, parent,p_id) {

    var res = [];

    var w = document.getElementById('newDivPop' + p_id);

    if (w) {
        w.remove();
    } else {

        res = arr_input;

        var name = res[0].name;
        var username = res[0].username;
        var email = res[0].email;
        var address = res[0].address;
        var phone = res[0].phone;
        var website = res[0].website;
        var company = res[0].company;

        var newDivPop = document.createElement('div');
        newDivPop.className = 'pop_up'+p_id;
        newDivPop.id = 'newDivPop' + p_id;
        newDivPop.style.fontWeight = 'normal';
        newDivPop.style.fontSize = '10px';
        newDivPop.style.position  = 'absolute';
        newDivPop.style.backgroundColor = '#fcfffa';
        newDivPop.style.zIndex = 1;
        newDivPop.style.border = '4px double black';

        newDivPop.style.left = '185px';
        newDivPop.style.top = '0px';

        var newName = document.createElement('p');
        newName.innerHTML = 'Name: ' + name;

        var newUsername = document.createElement('p');
        newUsername.innerHTML = 'Username: ' + username;

        var newEmail = document.createElement('p');
        newEmail.innerHTML = 'Email: ' + email;



        var newWebsite = document.createElement('p');
        newWebsite.innerHTML = 'Website: ' + website;

        var newAddress = document.createElement('p');
        newAddress.innerHTML = 'Address: ' ;var newPhone= document.createElement('p');
        newPhone.innerHTML = 'Phone: ' + phone;

        var newUl_adr = document.createElement('ul');

        var newStreet = document.createElement('li');
        newStreet.innerHTML = 'Street: ' + address.street;

       var newSuite = document.createElement('li');
       newSuite.innerHTML = 'Suite: ' + address.suite;

       var newCity = document.createElement('li');
       newCity.innerHTML = 'City: ' + address.city;

       var newZipcode = document.createElement('li');
       newZipcode.innerHTML = 'Zipcode: ' + address.zipcode;

       var newGeo = document.createElement('li');
       newGeo.innerHTML = 'Geo: ' ;

       var newUl_geo = document.createElement('ul');

       var newLat = document.createElement('li');
       newLat.innerHTML = 'Lat: ' + address.geo.lat;

       var newLng = document.createElement('li');
       newLng.innerHTML = 'Lng: ' + address.geo.lng;

       newUl_geo.appendChild(newLat);
       newUl_geo.appendChild(newLng);

       newUl_adr.appendChild(newStreet);
       newUl_adr.appendChild(newSuite);
       newUl_adr.appendChild(newCity);
       newUl_adr.appendChild(newZipcode);
       newUl_adr.appendChild(newGeo);
       newUl_adr.appendChild(newUl_geo);

       var newCompany = document.createElement('p');
       newCompany.innerHTML = 'Company: ' ;

       var newUl_company = document.createElement('ul');

       var newName_com = document.createElement('li');
       newName_com.innerHTML = 'Name: ' + company.name;

       var newCatchPhrase = document.createElement('li');
       newCatchPhrase.innerHTML = 'CatchPhrase: ' + company.catchPhrase;

       var newBs = document.createElement('li');
       newBs.innerHTML = 'Bs: ' + company.bs;


        var newBtnClose = document.createElement('button');
        newBtnClose.innerHTML =  'Close';
        newBtnClose.className = 'btn btn-primary btn-mar';
        newBtnClose.style.textAlign = 'center';
        newBtnClose.id = 'newBtnClose'+p_id;
        newBtnClose.addEventListener('click', () => Close_user(p_id));

       newUl_company.appendChild(newName_com);
       newUl_company.appendChild(newCatchPhrase);
       newUl_company.appendChild(newBs);

        newDivPop.appendChild(newName);
        newDivPop.appendChild(newUsername);
        newDivPop.appendChild(newEmail);
        newDivPop.appendChild(newPhone);
        newDivPop.appendChild(newWebsite);
        newDivPop.appendChild(newAddress);
        newDivPop.appendChild(newUl_adr);
        newDivPop.appendChild(newCompany);
        newDivPop.appendChild(newUl_company);
        newDivPop.appendChild(newBtnClose);
        parent.appendChild(newDivPop);
    }
}

function handle_comments(arr_input, parent,p_id) {
    var res = [];

    var w = document.getElementById('newDivPopCom' + p_id);

    if (w) {
      w.remove();
    } else {

        res = arr_input;

        var newDivPopCom = document.createElement('div');
        newDivPopCom.className = 'com_up' + p_id;
        newDivPopCom.style.fontWeight = 'normal';
        newDivPopCom.style.fontSize = '10px';
        newDivPopCom.id = 'newDivPopCom' + p_id;

        for (let i = 0; i < res.length; i++) {

            let newNameCom = document.createElement('p');
            newNameCom.innerHTML = 'Name: ' + res[i].name;

            let newEmailCom = document.createElement('p');
            newEmailCom.innerHTML = 'Email: ' + res[i].email;

            let newBodyCom = document.createElement('p');
            newBodyCom.innerHTML = 'Body: ' + res[i].body;

            let newDelimiter = document.createElement('p');
            newDelimiter.innerHTML = '---------------------------------------------------------------------------------------';


            newDivPopCom.appendChild(newNameCom);
            newDivPopCom.appendChild(newEmailCom);
            newDivPopCom.appendChild(newBodyCom);
            newDivPopCom.appendChild(newDelimiter);
        }

        parent.appendChild(newDivPopCom);
    }
}


function manipulation(arr) {

    var res = [];
    var div_tar = document.getElementById('page');

    res  = arr;

    page_object.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=9999  id=\"prev\">Previous</span></li>";

    for (let i = 0; i < page_object.cnt_page(); i++) {
        if (i === 0) {
            page_object.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=" + i * page_object.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        } else {
            page_object.page += "<li class=\"page-item\"><span class=\"page-link\" data-page=" + i * page_object.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        };
    }
    page_object.page +="<li class=\"page-item\"><span class=\"page-link\" data-page=99999  id=\"next\">Next</span></li>";

    page_object.paginator = document.querySelector(".pagination");
    page_object.paginator.innerHTML = page_object.page;

    //выводим первые записи {cnt}

  for (let i = 0; i < res.length; i++){
        (function () {
            var newDiv = insert_elemets(res[i].id, res[i].title, res[i].body, res[i].userId);
            div_tar.appendChild(newDiv);
        })();
    }

    page_object.div_num = document.querySelectorAll(".num");

    for (var i = 0; i < page_object.div_num.length; i++) {
        if (i < page_object.cnt) {
            page_object.div_num[i].style.display = "block";
        }
    }

    page_object.main_page = document.getElementById("page1");
    page_object.main_page.classList.add("paginator_active");

}


function change_count_page(count_p) {
    var j = document.getElementById('ul_pag').childElementCount;

    for (let i = 0; i < j; i++ ){
        document.getElementById('ul_pag').childNodes[0].remove();
    }

    page_object.cnt = count_p; //сколько отображаем сначала
    page_object.page='';

    page_object.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=9999  id=\"prev\">Previous</span></li>";

    for (let i = 0; i < page_object.cnt_page(); i++) {
        if (i === 0) {
            page_object.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=" + i * page_object.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        } else {
            page_object.page += "<li class=\"page-item\"><span class=\"page-link\" data-page=" + i * page_object.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        };
    }
    page_object.page +="<li class=\"page-item\"><span class=\"page-link\" data-page=99999  id=\"next\">Next</span></li>";

    page_object.paginator = document.querySelector(".pagination");
    page_object.paginator.innerHTML = page_object.page;

    for (var i = 0; i < page_object.div_num.length; i++) {
        if (i < page_object.cnt) {
            page_object.div_num[i].style.display = "block";
        }
    }

    page_object.main_page = document.getElementById("page1");
    page_object.main_page.classList.add("paginator_active");
}


function ul_pagination(event){
    var e = event || window.event;
    var target = e.target;
    var id = target.id;
    var parntNode;
    var parntNewNode;
    console.log(e,target,id);

    if (target.tagName.toLowerCase() != "span") return;

    var data_page = +target.dataset.page;

    if (id ==='next'){
       id = page_object.main_page.parentNode.nextSibling.childNodes[0].id;
       data_page = page_object.main_page.parentNode.nextSibling.childNodes[0].dataset.page;
     };

    if (id === 'prev'){
        id = page_object.main_page.parentNode.previousSibling.childNodes[0].id;
        data_page = page_object.main_page.parentNode.previousSibling.childNodes[0].dataset.page;
     }

    page_object.main_page.parentNode.classList.remove("disabled");
    page_object.main_page.classList.remove("paginator_active");

    page_object.main_page = document.getElementById(id);

    page_object.main_page.classList.add("paginator_active");
    page_object.main_page.parentNode.classList.add("disabled");

    if (parseInt(id.substr(4)) === 1) {
        document.getElementById('prev').parentNode.classList.add("disabled");
    } else if (parseInt(id.substr(4)) === page_object.cnt_page()) {
        document.getElementById('next').parentNode.classList.add("disabled");
    } else {
        console.log('End0', document.getElementById('prev').parentNode,document.getElementById('next').parentNode);
        document.getElementById('prev').parentNode.classList.remove("disabled");
        document.getElementById('next').parentNode.classList.remove("disabled");
    }


    for (var i = 0; i < page_object.div_num.length; i++) {
        var data_num = page_object.div_num[i].dataset.num;
        if (data_num <= data_page || data_num >= data_page) {
            page_object.div_num[i].style.display = "none";
        }
    }

    var j = 0;

    for (var i = data_page; i < page_object.div_num.length; i++) {
        if (j >= page_object.cnt) break;
        page_object.div_num[i].style.display = "block";
        j++;
    }
}