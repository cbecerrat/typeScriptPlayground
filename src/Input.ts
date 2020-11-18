exports = async function (payload, response) {
    const DB           = context.services.get('mongodb-atlas').db("mydb");
    const INCIDENTES   = DB.collection("incidentes");
    const CADENA_VACIA = '';

    response.setStatusCode(200);
    const { data } = JSON.parse(payload.body.text());    
    
    if (!data) {
        response.setBody(CADENA_VACIA);
        return;
    }
    
    try {
        const { insertedId } = await INCIDENTES.insertOne({ data });
        data["_id"] = insertedId;
        const body = { _id: insertedId };
        response.setBody(JSON.stringify(body));
    } catch (err) {        
        response.setBody(CADENA_VACIA);
    }
}