db = db.getSiblingDB("pennyPinchers");

// Creation of list of Users
db.createCollection("UserList");
userCollection = db.getCollection("UserList");
userCollection.remove({});
userCollection.insert({
  userId: 1,
  username: "MyTran",
  password: "1234",
  fname: "My", 
  lname: "Tran",
  creditcardInfo : {
    cardNo: 43242234234324,
    cvv: 123
  },
  isPremium: false, 
  phoneNo: "1203665356",
  email: "PP@pmail.com"
});

userCollection.insert({
  userId: 2,
  username: "DanNguyen",
  password: "nad",
  fname: "Dan", 
  lname: "Nguyen",
  creditcardInfo : {
    cardNo: 43242234234324,
    cvv: 123
  },
  isPremium: false, 
  phoneNo: "1203665356",
  email: "PP@pmail.com"
});

userCollection.insert({
  userId: 3,
  username: "AjerLodhi",
  password: "MyChoice",
  fname: "Ajer", 
  lname: "Lodhi",
  creditcardInfo : {
    cardNo: 43242234234324,
    cvv: 123
  },
  isPremium: true,
  phoneNo: "1203665356", 
  email: "PP@pmail.com"
});

userCollection.insert({
  userId: 4,
  username: "CaroAngelica",
  password: "4252ewhw642w4353463ehet",
  fname: "Caro", 
  lname: "Angelica",
  creditcardInfo : {
    cardNo: 43242234234324,
    cvv: 123
  },
  isPremium: false, 
  phoneNo: "1203665356",
  email: "PP@pmail.com"
});

// Creation of list of Subscriptions
db.createCollection("subscriptionList");
listsCollection = db.getCollection("subscriptionList");
listsCollection.remove({});
listsCollection.insert({
  listId: 1,
  name: "My's List",
  description: "In this list, I keep track of all my subscriptions",
  userId: 1,
});

listsCollection.insert({
  listId: 2,
  name: "Dan's List",
  description: "In this list, I keep track of all my subscriptions",
  userId: 2,
});

listsCollection.insert({
  listId: 3,
  name: "Ajer's List",
  description: "In this list, I keep track of all my subscriptions",
  userId: 3,
});

listsCollection.insert({
  listId: 4,
  name: "Caro's List",
  description: "In this list, I keep track of all my subscriptions",
  userId: 4,
});

// Creation of SubscriptionItems
db.createCollection('subscriptionItems')
itemcollections = db.getCollection("subscriptionItems")
itemcollections.remove({})
itemcollections.insert({
    listId : 1,
    itemId : 1, 
    serviceName : "Amazon Prime",
    addDate : 5/2/2021,
    dueDate : 6/2/2021,
    price : 12,
    isArchived : false,
    subscriptionType: "monthly",
})

itemcollections.insert({
    listId : 1,
    itemId : 2, 
    serviceName : "HBO premium",
    addDate : 5/4/2021,
    dueDate : 6/4/2021,
    price : 15,
    isArchived : false,
    subscriptionType: "monthly",
})

itemcollections.insert({
        listId : 2,
        itemId : 1, 
        serviceName : "Netflix",
        addDate : 5/4/2021,
        dueDate : 6/4/2021,
        price : 10,
        isArchived : false,
        subscriptionType: "monthly",
})
            
itemcollections.insert(
{
    listId : 3,
    itemId : 1, 
    serviceName : "Crunchyroll",
    addDate : 5/4/2021,
    dueDate : 6/4/2021,
    price : 7,
    isArchived : false,
    subscriptionType: "trial",
})
    
    itemcollections.insert(
    {
        listId : 4,
        itemId : 1, 
        serviceName : "Spotify Premium",
        addDate : 5/4/2021,
        dueDate : 6/4/2021,
        price : 11,
        isArchived : false,
        subscriptionType: "annually",
    })

