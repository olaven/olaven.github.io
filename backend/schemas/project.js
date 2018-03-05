    export default {
    title: "Project",
    name : "project",
    type : "document",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string"
        }, 
        {
            title: "Description", 
            name : "descriptioon", 
            type : "string"
        }, 
        {
            title: "URL", 
            name : "url", 
            type : "url"
        },
        {
            title: "Collaborators", 
            name : "collaborators", 
            type : "array", 
            of   : [
                {
                    type: "reference", 
                    to  : [{type: "person"}]
                }, 
                {
                    type: "string"//if collaborators can't/wont't be registered
                }
            ]
        }
    ]
    };
