let newList = []
let page = 1;
const apiKey = "abcbbb8d05f74e8ea02737181c7d9f1c";

const loadNews = async() => {
    let url=`https://newsapi.org/v2/everything?q=world&apiKey=${apiKey}`
    let data = await fetch(url);
    let result = await data.json();
    newList = result.articles;
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

const render = (list) => {
    console.log("You call render and you have list", list);
    document.getElementById("total").innerHTML = `Total stories: ${list.length*page}`;
    let newsHtml = list.map(item => `<div id="news">
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
        let url=`https://newsapi.org/v2/everything?q=world&page=${page}&apiKey=${apiKey}`
        let data = await fetch(url);
        let result = await data.json();
        newList = result.articles;
        if (typeof newList !== "undefined") {
            render(newList)
        } else {
            document.getElementById("loadMore").style.visibility = "hidden";
        }
    }
    if (page == 5) document.getElementById("loadMore").style.visibility = "hidden";
}


loadNews();