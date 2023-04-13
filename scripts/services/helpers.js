export const escapeHTML = (htmlStr) => {

    return htmlStr.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");        

 }

 export const unEscapeHTML = (htmlStr) => {

    return htmlStr.replace(/&lt;/g , "<") 
    .replace(/&gt;/g , ">")   
    .replace(/&quot;/g , "\"") 
    .replace(/&#39;/g , "\'") 
    .replace(/&amp;/g , "&");

}

export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}