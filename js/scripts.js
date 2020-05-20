let newList = []
const apiKey = "abcbbb8d05f74e8ea02737181c7d9f1c";

const loadNews = async() => {
    let url=`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`
    let data = await fetch(url);
    let result = await data.json();
    newList = result.articles;
    render(newList);
    console.log("What we get here?", result);
}

const render = (list) => {
    console.log("You call render and you have list", list);
    let newsHtml = list.map(item => `<div id="news">
        <div id="contentArea">
            <div id="title">${item.title}</div>
            <div id="source">${item.source.name}</div>
            <div id="publishedAt">${item.publishedAt}</div>
        </div>
        <div id="imgArea">
                <img src="${item.urlToImage}" width=200/>
        </div>
    </div>`).join("");
    document.getElementById("newsArea").innerHTML = newsHtml;
}

loadNews();