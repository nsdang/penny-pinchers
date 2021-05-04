db = db.getSiblingDB('pennyPinchers')
db.createCollection('subscriptionList')
listsCollection = db.getCollection("subscriptionList")
listsCollection.remove({})
listsCollection.insert(
{
    listId : 1,
    name : "My's List",
    description : "In this list, I keep track of all my subscriptions",
    userId : 1,
    type: "Monthly",
    itemList : [
        {
            itemId: 1,
        serviceName : "Amazon Prime",
        addDate : 5/2/2021,
        dueDate : 6/2/2021,
        price : 12,
        isArchived : false,
        }]
	 }
)
listsCollection.insert(
    {
        listId : 2,
        name : "Dan's List",
        description : "In this list, I keep track of all my subscriptions",
        userId : 2,
        type: "Monthly",
        itemList : [
            {
                itemId: 1,
            serviceName : "Netflix",
            addDate : "5/4/2021",
            dueDate : "6/4/2021",
            price : 10,
            isArchived : false,
            }]
         }
    )
        
listsCollection.insert(
    {
    listId : 3,
    name : "Ajer's List",
    description : "In this list, I keep track of all my subscriptions",
    userId : 3,
    type: "Monthly",
    itemList : [
        {
            itemId: 1,
        serviceName : "Crunchyroll",
        addDate : "5/4/2021",
        dueDate : "6/4/2021",
        price : 7,
        isArchived : false,
    }]
})

listsCollection.insert(
    {
    listId : 4,
    name : "Caro's List",
    description : "In this list, I keep track of all my subscriptions",
    userId : 4,
    type: "Monthly",
    itemList : [
        {
            itemId: 1,
        serviceName : "Spotify Premium",
        addDate : "5/4/2021",
        dueDate : "6/4/2021",
        price : 11,
        isArchived : false,
    }]
})
        
    
