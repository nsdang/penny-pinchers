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
    items : [
        {
        serviceName = "Amazon Prime",
        addDate = 5/2/2021,
        dueDate = 6/2/2021,
        price = 12,
        isArchived = false,
        }]
	 }
)
listsCollection.insert(
    {
        listId : 2,
        name : "Dan's List",
        description : "In this list, I keep track of all my subscriptions",
        userId : 2,
        items : [
            {
            serviceName = "Netflix",
            addDate = 5/4/2021,
            dueDate = 6/4/2021,
            price = 10,
            isArchived = false,
            }]
         }
    )
        
listsCollection.insert(
    {
    listId : 3,
    name : "Ajer's List",
    description : "In this list, I keep track of all my subscriptions",
    userId : 3,
    items : [
        {
        serviceName = "Crunchyroll",
        addDate = 5/4/2021,
        dueDate = 6/4/2021,
        price = 7,
        isArchived = false,
    }]
})

listsCollection.insert(
    {
    listId : 4,
    name : "Caro's List",
    description : "In this list, I keep track of all my subscriptions",
    userId : 4,
    items : [
        {
        serviceName = "Spotify Premium",
        addDate = 5/4/2021,
        dueDate = 6/4/2021,
        price = 11,
        isArchived = false,
    }]
})
        
    
