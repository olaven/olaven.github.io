const sanityClient = require("@sanity/client");
const client = sanityClient({
    projectId: "ID",
    dataset: "production",
    token:
        "TOKEN", // or leave blank to be anonymous user
    useCdn: false // `false` if you want to ensure fresh data
});

client.getDocument('article').then(article => {
    console.log(article); 
}).catch(err => {console.error(err.message)})