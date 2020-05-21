let newList = []
let page = 1;
let sourceTotal = {};
let checkArray = {}
let newsHtml = "";
const apiKey = "abcbbb8d05f74e8ea02737181c7d9f1c";

const loadNews = async() => {
    let url=`https://newsapi.org/v2/everything?sortBy=relevancy&q=world&apiKey=${apiKey}`
    let data = await fetch(url);
    let result = await data.json();
    newList = result.articles;
    renderSource(newList);
    render(newList);
}

let compareTime = (datePublish) => {
    yearDiff = moment().diff(datePublish, 'years');
    dayDiff = moment().diff(datePublish, 'days');
    minDiff = moment().diff(datePublish, 'minutes');
    secDiff = moment().diff(datePublish, 'seconds');
    if (yearDiff>0) {
        return (yearDiff);
    } 
    else if (dayDiff>0) {
        return (dayDiff);
    }
    else if (minDiff>0) {
        return (minDiff);
    }
    else if (secDiff>0) {
        return (secDiff);
    }
}
function inSource (item) {
    if (item in sourceTotal) {
        sourceTotal[item] += 1;
        return (false);
    } else {
        sourceTotal[item] = 1;
        return (true);
    }
}

function showContent() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    let unCheckbox = document.querySelectorAll('input[type=checkbox]:not(:checked)')
    for (var i = 0; i < checkboxes.length; i++) {
        checkArray[checkboxes[i].value] = 0;
    }
    for (var i = 0; i < unCheckbox.length; i++) {
        delete (checkArray[unCheckbox[i].value]);
    }
    console.log(checkArray);
    let filterSource = newList.filter(item => {
        console.log(item.source.name, item.source.name in checkArray)
        return (item.source.name in checkArray);
    })
    render(filterSource);
}

const renderSource = (list) => {
    let count = list.map((item) => {
        if (item.source.name in sourceTotal) {
            sourceTotal[item.source.name] += 1;
            return (false);
        } else {
            sourceTotal[item.source.name] = 1;
            return (true);
        }
    })
    console.log("Source", sourceTotal);
    let newsSource = `<legend>Choose your source</legend>`;
    for (let key in sourceTotal) {
        newsSource += `<div>
        <input type="checkbox" id="sourceCheck" value="${key}" onclick="showContent()" checked>
        <label for="coding">${key} (${sourceTotal[key]})</label>
        </div>`
    }
    document.getElementById("sourceTotal").innerHTML = newsSource;
}

const render = (list) => {
    console.log("You call render and you have list", list);
    document.getElementById("total").innerHTML = `Total stories: ${list.length}`;
    newsHtml = list.map(item => `<div id="news">
        <div id="contentArea">
            <div id="title"><h2>${item.title}<h2></div>
            <div id="source"><p><i>By ${item.source.name}</i></p></div>
            <div id="brief"><p>${item.description}<p></div>
            <a href="${item.url}" id="source">Read More</a>
            <div id="publishedAt">${compareTime(item.publishedAt)} days ago</div>
        </div>
        <div id="imgArea">
            <img src="${item.urlToImage}" width=400/>
        </div>
    </div>`).join("");
    document.getElementById("newsArea").innerHTML = newsHtml;
}

let loadMore = async() => {
    page += 1;
    if (page <= 5) {
        let url=`https://newsapi.org/v2/everything?sortBy=relevancy&q=world&page=${page}&apiKey=${apiKey}`
        let data = await fetch(url);
        let result = await data.json();
        addNewList = result.articles;
        newList = newList.concat(addNewList);
        if (typeof newList !== "undefined") {
            renderSource(newList);
            render(newList)
        } else {
            document.getElementById("loadMore").style.visibility = "hidden";
        }
    }
    if (page == 5) document.getElementById("loadMore").style.visibility = "hidden";
}


loadNews();