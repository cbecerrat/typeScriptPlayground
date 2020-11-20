/*
curl \
-H "Content-Type: application/json" \
-d '{"key": "011EFEA0CAC926232ADD733F86E3D9F6AB53C237BE9E40F9E6A2E255BA33ABC3", "collection": "incidentes", "query": {"estatus": "PENDIENTE"}}' \
https://webhooks.mongodb-realm.com/api/client/v2.0/app/online-djmbz/service/db/incoming_webhook/find-many

curl \
-H "Content-Type: application/json" \
-d '{"key": "011EFEA0CAC926232ADD733F86E3D9F6AB53C237BE9E40F9E6A2E255BA33ABC3", "collection": "incidentes", "query": {"ultimo_seguimiento": { "$regex": {"pattern": "cesaroctavio\\.becerra"}}, "estatus": "PENDIENTE"}}' \
https://webhooks.mongodb-realm.com/api/client/v2.0/app/online-djmbz/service/db/incoming_webhook/find-many
*/

// https://docs.mongodb.com/realm/mongodb/actions/collection.findOne/
exports = async function (payload, response) {
    if (validarKey(payload, response)) {
        return;
    }

    const { collection, query } = JSON.parse(payload.body.text());
    completeQuery(query);
    const DB = context.services.get('mongodb-atlas').db('mydb').collection(collection);
    const result = await DB.find(query).toArray();

    response.setStatusCode(200);
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

const completeQuery = function (query) {
    for (const key in query) {
        const value = query[key];
        const regex = value.$regex;

        if (regex == null) {
            return;
        } else if (regex.flags == null) {
            query[key] = { $regex: BSON.BSONRegExp(regex.pattern) };
        } else {
            query[key] = { $regex: BSON.BSONRegExp(regex.pattern, regex.flags) };
        }
    }
};
