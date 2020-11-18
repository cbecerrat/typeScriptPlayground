/*
curl \
-H "Content-Type: application/json" \
-d '{"key": "011EFEA0CAC926232ADD733F86E3D9F6AB53C237BE9E40F9E6A2E255BA33ABC3", "collection": "myCollection", "elements": [{"insertOne": {"_id":1}}, {"insertOne": {"_id":2}}, {"insertOne": {"_id":3}}]}' \
https://webhooks.mongodb-realm.com/api/client/v2.0/app/online-djmbz/service/db/incoming_webhook/bulk-insert
*/
// https://docs.mongodb.com/realm/mongodb/actions/collection.findOne/
exports = async function (payload, response) {
    if (validarKey(payload, response)) {
        return;
    }

    const { collection, elements } = JSON.parse(payload.body.text());
    const DB = context.services.get('mongodb-atlas').db('mydb').collection(collection);

    const result = await DB.bulkWrite(elements);
    response.setBody(JSON.stringify(result));
};

const validarKey = function (payload, response) {
    const EMPTY_STRING = '';
    const ACCEPTED     = ['011EFEA0CAC926232ADD733F86E3D9F6AB53C237BE9E40F9E6A2E255BA33ABC3'];

    const data = JSON.parse(payload.body.text());
    const key  = data && data.key ? data.key : EMPTY_STRING;

    if (ACCEPTED.includes(key)) {
        return false;
    } else {
        const respuesta = { mensaje: 'FUCK YOU!' };
        response.setStatusCode(500);
        response.setBody(JSON.stringify(respuesta));
        return true;
    }
};
