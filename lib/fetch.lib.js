export function getXML() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://data.alexa.com/data?cli=10&dat=s&url=http://facebook.com/", true);
        xhr.responseType = "xml";
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.onload = function () {
            const status = xhr.status;
            console.log(status);
            if (status === 200) {
                if (xhr.response.URL === "https://signin.intra.42.fr/users/sign_in")
                    reject("You are not logged in to 42 Intra");
                else resolve(xhr.response);
            } else reject(xhr.response);
        };
        xhr.send();
    });
}