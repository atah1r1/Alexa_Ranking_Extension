const convert = require('xml-js');

export default async function handler(request, response) {
    console.log(request.query.url);
    const res = await fetch(`https://data.alexa.com/data?cli=10&dat=s&url=${"http://alhudabook.com"}`);
    const data = await res.text();
    const result = convert.xml2json(data, { compact: true, spaces: 4 });
    response.send(result);
}