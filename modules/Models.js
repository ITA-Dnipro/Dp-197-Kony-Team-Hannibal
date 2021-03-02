//Type your code here
function UserDataModel(id, fullName, email, login, password) {
  this.id = id;
  this.fullName = fullName || '';
  this.email = email || '';
  this.login = login || '';
  this.password = password || '';
}

function UserProfileDataModel(fullName, email, login) {
  this.fullName = fullName || '';
  this.mail = email || '';
  this.login = login || '' ; 
}

function NewsResourceModel(name, url, logo) {
  this.name = name || '';
  this.url = url || '';
  this.logo = logo || '';
}

function RssFeedModel(description, url, logo) {
  this.description = description || '';
  this.url = url || '';
  this.logo = logo || '';
}

function NewsModel(title, logo, link, pubDate) {
  this.newsTitle = title || '';
  this.logo = logo || '';
  this.link = link || '';
  this.pubDate = pubDate || '';
}
