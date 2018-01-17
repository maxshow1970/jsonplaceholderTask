;(function examples() {


const apiURL = 'https://jsonplaceholder.typicode.com/';

var pageObject = {
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

    function initStartPage(idLoad)
{
    var newDivH1 = document.createElement('div');
    newDivH1.id = 'newDivH1';
    newDivH1.className = 'row textalign header_margin';
    newDivH1.style.fontWeight = 'bold';

    var newH1 = document.createElement('h1');
    newH1.innerText = 'Find some heckin recepies';

    newDivH1.appendChild(newH1);

    var newDivContolElements = document.createElement('div');
    newDivContolElements.className = 'row textalign header_margin';
    var newDivLoader = document.createElement('div');
    newDivLoader.className = 'ld ld-hourglass ld-spin-fast';
    newDivLoader.style = 'font-size:64px;color:#0275d8; display: none ;margin-bottom: 50px; left: 50%';
    newDivLoader.id = 'loader';

    var newBtnStart = document.createElement('button');
    newBtnStart.innerHTML =  'Load Posts';
    newBtnStart.className = 'btn btn-primary progress-button';
    newBtnStart.id = 'BtnStart';
    newBtnStart.setAttribute('data-style', 'fill');
    newBtnStart.setAttribute('data-horizontal',0);
    newBtnStart.addEventListener('click', () => downLoadPosts());

    var newSelectCountPages = document.createElement('select')
    newSelectCountPages.className = 'select_post';
    newSelectCountPages.id = 'count_p';
    newSelectCountPages.addEventListener('change', (event) => changeCountPage(event));

    var newOption10 = document.createElement('option');
    newOption10.innerText = '10 post';
    newOption10.value = '10';

    var newOption20 = document.createElement('option');
    newOption20.innerText = '20 post';
    newOption20.value = '20';

    var newOption50 = document.createElement('option');
    newOption50.innerText = '50 post';
    newOption50.value = '50';

    newSelectCountPages.appendChild(newOption10);
    newSelectCountPages.appendChild(newOption20);
    newSelectCountPages.appendChild(newOption50);

    newDivContolElements.appendChild(newBtnStart);
    newDivContolElements.appendChild(newSelectCountPages);

    var newDivRow = document.createElement('div');
    newDivRow.className = 'row';

    var newDivRowPages = document.createElement('div');
    newDivRowPages.className = 'page';
    newDivRowPages.id = 'page';

    newDivRow.appendChild(newDivRowPages);

    var newDivRowPag = document.createElement('div');
    newDivRowPag.className = 'row textalign';

    var newDivPagin = document.createElement('div');
    newDivPagin.className = 'paginn';
    newDivPagin.id = 'pag';

    var newUlPagin = document.createElement('ul');
    newUlPagin.className = 'pagination';
    newUlPagin.id = 'ul_pag';
    newUlPagin.addEventListener('click', () => clickPagination(event));


    newDivPagin.appendChild(newUlPagin);
    newDivRowPag.appendChild(newDivPagin);

    var cont = document.getElementById(idLoad);
    cont.appendChild(newDivH1);
    cont.appendChild(newDivLoader);
    cont.appendChild(newDivContolElements);
    cont.appendChild(newDivRow);
    cont.appendChild(newDivRowPag);


};

function loadPost (url_input) {
    document.getElementById("loader").style.display = 'block';
    axios.get(url_input)
        .then(function (response){
            renderPosts(response.data);
            document.getElementById("loader").style.display = 'none';
        })
        .catch(function (error) {
            document.getElementById("loader").style.display = 'none';
            console.log(error);
        });
}


function loadUser (parent,p_id ) {
    const url_input = apiURL +'users?&id=' + p_id;
    document.getElementById("loader").style.display = 'block';
    axios.get(url_input)
        .then(function (response) {
            estimationUser(response.data,parent,p_id);
            document.getElementById("loader").style.display = 'none';
        })
        .catch(function (error) {
            document.getElementById("loader").style.display = 'none';
            console.log(error);
        });
}

function loadComments (parent,p_id ) {
    const url_input = apiURL +'comments?&postId=' + p_id;
    document.getElementById("loader").style.display = 'block';
    axios.get(url_input)
        .then(function (response) {
            estimationComments(response.data,parent,p_id);
            document.getElementById("loader").style.display = 'none';
        })
        .catch(function (error) {
            document.getElementById("loader").style.display = 'none';
            console.log(error);
        });
}

function insertElemets(id, title, body, user_id) {
    var newDiv = document.createElement('div');
    newDiv.id = 'newDiv'+id;
    newDiv.className = 'num card ';
  //  newDiv.style.position = 'relative';
    newDiv.style.marginBottom = '30px';
    newDiv.setAttribute('data-num', id);
    newDiv.style.fontWeight = 'bold';


    var newTitle = document.createElement('div');
    newTitle.className = 'name card-header';
    newTitle.innerHTML = title;
    newTitle.style.textAlign = 'center';

    var newBody = document.createElement('div');
    newBody.className = 'card-body';
    newBody.innerHTML = body;
  //  newBody.style.fontWeight = 'normal';

    var newFooter = document.createElement('div')
    newFooter.className = 'card-footer d-flex justify-content-around align-items-center';

    var newBtn = document.createElement('button');
    newBody.style.fontWeight = 'normal';
    newBtn.innerHTML =  'User';
    newBtn.className = 'btn btn-primary btn-mar';
    newBtn.id = 'newBtn'+id;
//    newBtn.addEventListener('click', () => LoadUser(newDiv, id) );
    newBtn.addEventListener('click', () => loadUser(newDiv, id) );

    var newBtnCom = document.createElement('button');
    newBtnCom.innerHTML =  'Comments';
    newBtnCom.className = 'btn btn-primary btn-mar';
    newBtnCom.id = 'newBtnCom'+id;
    newBtnCom.addEventListener('click', () => loadComments(newDiv, id) );


    newFooter.appendChild(newBtn);
    newFooter.appendChild(newBtnCom);

    newDiv.appendChild(newTitle);
    newDiv.appendChild(newBody);
    newDiv.appendChild(newFooter);

    return newDiv;
}


function downLoadPosts() {
  loadPost(apiURL+ 'posts');
  var btn = document.getElementById('BtnStart');

  btn.classList.add("disabled");
}

function estimationUser(arr_input, parent,p_id) {

        const { name, username, email, address, phone, website, company} = arr_input[0];

        var newDivPop = document.createElement('div');
        newDivPop.className = 'modal fade';
        newDivPop.id = 'newDivPop' + p_id;

        var newDialog = document.createElement('div');
        newDialog.className = 'modal-dialog';

        var newContent = document.createElement('div');
        newContent.className = 'modal-content';

        var newHeader = document.createElement('div');
        newHeader.className = 'modal-header';

        var newTitle = document.createElement('h4');
        newTitle.className = 'modal-title';
        newTitle.innerText = 'User';

        var newBody = document.createElement('div');
        newBody.className = 'modal-body';
        newBody.style.fontSize = '10px';

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

        newUl_company.appendChild(newName_com);
        newUl_company.appendChild(newCatchPhrase);
        newUl_company.appendChild(newBs);

        newBody.appendChild(newName);
        newBody.appendChild(newUsername);
        newBody.appendChild(newEmail);
        newBody.appendChild(newPhone);
        newBody.appendChild(newWebsite);
        newBody.appendChild(newAddress);
        newBody.appendChild(newUl_adr);
        newBody.appendChild(newCompany);
        newBody.appendChild(newUl_company);


        var newFooter = document.createElement('div');
        newFooter.className = 'modal-footer';

        var newBtnClose = document.createElement('button');
        newBtnClose.className = 'btn btn-default';
        newBtnClose.setAttribute('data-dismiss','modal');
        newBtnClose.innerText = 'Close';

        newFooter.appendChild(newBtnClose);
        newHeader.appendChild(newTitle);

        newContent.appendChild(newHeader);
        newContent.appendChild(newBody);
        newContent.appendChild(newFooter);
        newDialog.appendChild(newContent);
        newDivPop.appendChild(newDialog);

        parent.appendChild(newDivPop);
        $('#newDivPop' + p_id ).modal();
 //  }
}

function estimationComments(arr_input, parent,p_id) {

    var w = document.getElementById('newDivPopCom' + p_id);

    if (w) {
      w.remove();
    } else {

        var newDivPopCom = document.createElement('div');
        newDivPopCom.className = 'com_up' + p_id;
        newDivPopCom.style.fontWeight = 'normal';
        newDivPopCom.style.fontSize = '10px';
        newDivPopCom.id = 'newDivPopCom' + p_id;

        for (let i = 0; i < arr_input.length; i++) {

            let newNameCom = document.createElement('p');
            newNameCom.innerHTML = 'Name: ' + arr_input[i].name;

            let newEmailCom = document.createElement('p');
            newEmailCom.innerHTML = 'Email: ' + arr_input[i].email;

            let newBodyCom = document.createElement('p');
            newBodyCom.innerHTML = 'Body: ' + arr_input[i].body;

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


function renderPosts(arr) {

    var div_tar = document.getElementById('page');

    pageObject.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=9999  id=\"prev\">Previous</span></li>";

    for (let i = 0; i < pageObject.cnt_page(); i++) {
        if (i === 0) {
            pageObject.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=" + i * pageObject.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        } else {
            pageObject.page += "<li class=\"page-item\"><span class=\"page-link\" data-page=" + i * pageObject.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        };
    }
    pageObject.page +="<li class=\"page-item\"><span class=\"page-link\" data-page=99999  id=\"next\">Next</span></li>";

    pageObject.paginator = document.querySelector(".pagination");
    pageObject.paginator.innerHTML = pageObject.page;

    //выводим первые записи {cnt}

  for (let i = 0; i < arr.length; i++){
        (function () {
            var newDiv = insertElemets(arr[i].id, arr[i].title, arr[i].body, arr[i].userId);
            div_tar.appendChild(newDiv);
        })();
    }

    pageObject.div_num = document.querySelectorAll(".num");

    for (var i = 0; i < pageObject.div_num.length; i++) {
        if (i < pageObject.cnt) {
            pageObject.div_num[i].style.display = "block";
        }
        else {
            pageObject.div_num[i].style.display = "none";
        }
    }

    pageObject.main_page = document.getElementById("page1");
    pageObject.main_page.classList.add("paginator_active");
}

function changeCountPage(event) {

    document.getElementById('ul_pag').innerHTML = '';

    pageObject.cnt = event.target.value //сколько отображаем сначала
    pageObject.page='';

    pageObject.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=9999  id=\"prev\">Previous</span></li>";

    for (let i = 0; i < pageObject.cnt_page(); i++) {
        if (i === 0) {
            pageObject.page += "<li class=\"page-item disabled\"><span class=\"page-link\" data-page=" + i * pageObject.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        } else {
            pageObject.page += "<li class=\"page-item\"><span class=\"page-link\" data-page=" + i * pageObject.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span></li>";
        };
    }
    pageObject.page +="<li class=\"page-item\"><span class=\"page-link\" data-page=99999  id=\"next\">Next</span></li>";

    pageObject.paginator = document.querySelector(".pagination");
    pageObject.paginator.innerHTML = pageObject.page;

    for (var i = 0; i < pageObject.div_num.length; i++) {
        if (i < pageObject.cnt) {
            pageObject.div_num[i].style.display = "block";
        } else {
            pageObject.div_num[i].style.display = "none";
        }
    }

    pageObject.main_page = document.getElementById("page1");
    pageObject.main_page.classList.add("paginator_active");
}


function clickPagination(event){
    var e = event || window.event;
    var target = e.target;
    var id = target.id;
    var parntNode;
    var parntNewNode;

    if (target.tagName.toLowerCase() != "span") return;

    var data_page = +target.dataset.page;

    if (id ==='next'){
       id = pageObject.main_page.parentNode.nextSibling.childNodes[0].id;
       data_page = pageObject.main_page.parentNode.nextSibling.childNodes[0].dataset.page;
     };

    if (id === 'prev'){
        id = pageObject.main_page.parentNode.previousSibling.childNodes[0].id;
        data_page = pageObject.main_page.parentNode.previousSibling.childNodes[0].dataset.page;
     }

    pageObject.main_page.parentNode.classList.remove("disabled");
    pageObject.main_page.classList.remove("paginator_active");

    pageObject.main_page = document.getElementById(id);

    pageObject.main_page.classList.add("paginator_active");
    pageObject.main_page.parentNode.classList.add("disabled");

    if (parseInt(id.substr(4)) === 1) {
        document.getElementById('prev').parentNode.classList.add("disabled");
    } else if (parseInt(id.substr(4)) === pageObject.cnt_page()) {
        document.getElementById('next').parentNode.classList.add("disabled");
    } else {
        document.getElementById('prev').parentNode.classList.remove("disabled");
        document.getElementById('next').parentNode.classList.remove("disabled");
    }

    for (var i = 0; i < pageObject.div_num.length; i++) {
        var data_num = pageObject.div_num[i].dataset.num;
        if (data_num <= data_page || data_num >= data_page) {
            pageObject.div_num[i].style.display = "none";
        }
    }

    var j = 0;

    for (var i = data_page; i < pageObject.div_num.length; i++) {
        if (j >= pageObject.cnt) break;
        pageObject.div_num[i].style.display = "block";
        j++;
    };
}

    return {
        init(idContainer) { initStartPage(idContainer)}
           };
}()).init('container');
