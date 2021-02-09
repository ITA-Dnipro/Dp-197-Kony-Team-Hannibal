define({ 

 onInit: function() {
   this.view.ButtonTest.onClick = this.onBtnTest.bind(this);
   this.view.addArr.onClick = function() {
     var users = [
         {
           id: 31,
           fullName: "John Dir",
           email: "xvxjxyv@gmail.com",
           login: "Roller",
           password: "bc1348"
        },
                {
           id: 15,
           fullName: "jessey pinkman",
           email: "vbnvvb@gmail.com",
           login: "Bomber",
           password: "bc1348"
        },
                {
           id: 7,
           fullName: "ruper drill",
           email: "ghsjs@gmail.com",
           login: "Spanch",
           password: "bc1348"
        },
                {
           id: 28,
           fullName: "Sergey Grifers",
           email: "blabla@gmail.com",
           login: "Motley Crew",
           password: "bc1348"
        },
                {
           id: 44,
           fullName: "trest gress",
           email: "xnmxmx@gmail.com",
           login: "Razor",
           password: "bc1348"
        },
        
     ];
     kony.store.setItem("usersArray", users);
   }.bind(this);
   
   this.view.showarr.onClick = function() {
     var myValue = kony.store.getItem("usersArray");
     alert(JSON.stringify(myValue));
   }.bind(this);
   
   this.view.dellArr.onClick = function() {
     kony.store.clear();
     UserProfile = {
                  id: 28,
           fullName: "Sergey Grifers",
           email: "blabla@gmail.com",
           login: "Motley Crew",
           password: "bc1348"
     };
     
   }.bind(this);
  
 },
  
  onBtnTest: function() {
    var formId = kony.application.getCurrentForm().id;
    var navigation = new kony.mvc.Navigation("formUserProfile");
    navigation.navigate(formId);
  },
  
  
  
 
  
 });