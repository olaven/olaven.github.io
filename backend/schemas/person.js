export default {
    title: "Person", 
    name : "person", 
    type : "document",
    fields: [
        {
            title: "Name", 
            name : "name",
            type : "string"
        }, 
        {
            title: "Image", 
            name : "image", 
            type : "image"
        },
        {
            title: "About", 
            name : "about", 
            type : "block"
        },
        {
            title: "Contacts", 
            name : "contacts", 
            type : "array", 
            of   : [{type:"contact"}]
        }
    ]
}