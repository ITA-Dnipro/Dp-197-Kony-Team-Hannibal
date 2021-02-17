//Type your code here
function UserDataModel(id, fullName, email, login, password) {
  this.id = id;
  this.fullName = fullName || '';
  this.email = email || '';
  this.login = login || '';
  this.password = password || '';
}

function NewsResourceModel(name, url, logo) {
  this.name = name;
  this.url = url;
  this.logo = logo;
}

function RssFeedModel(description, url, logo) {
  this.description = description;
  this.url = url;
  this.logo = logo;
}

function NewsModel(title, description, link, pubDate) {
  this.newsTitle = title;
  this.newsDescription = description;
  this.link = link;
  this.pubDate = pubDate;
}
