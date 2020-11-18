/*
curl \
-H "Content-Type: application/json" \
-d '{"key": "011EFEA0CAC926232ADD733F86E3D9F6AB53C237BE9E40F9E6A2E255BA33ABC3", "collection": "incidentes", "query": {"_id": "AA0000-006"}, "update": {"$set": {"estado": "PENDIENTE"}}}' \
https://webhooks.mongodb-realm.com/api/client/v2.0/app/online-djmbz/service/db/incoming_webhook/find-one-and-update
*/
// https://docs.mongodb.com/realm/mongodb/actions/collection.findOne/
exports = async function (payload, response) {
    if (validarKey(payload, response)) {
        return;
    }

    const { collection, query, update } = JSON.parse(payload.body.text());
    const options = { returnNewDocument: true };
    const DB = context.services.get('mongodb-atlas').db('mydb').collection(collection);

    const document = await DB.findOneAndUpdate(query, update, options);
    response.setBody(JSON.stringify(document));
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
