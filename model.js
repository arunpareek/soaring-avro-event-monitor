var eventsModel = module.exports;
var elasticsearch = require('elasticsearch');

var ELASTIC_SEARCH_HOST = process.env.ELASTIC_CONNECTOR || 'http://129.150.114.134:9200';

var client = new elasticsearch.Client({
    host: ELASTIC_SEARCH_HOST,
});

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Connection to Elastic Search is established');
    }
});




eventsModel.saveProductEvent = async function (event) {
    console.log(" event.transactionIdentifier"+ event.transactionIdentifier)
    console.log(" event type "+ event.eventType)
    try {
        var response = await client.index({
            index: 'soaringeventsproduct',
            type: event.eventType,
            body: event
        }
        );

        console.log("Response: " + JSON.stringify(response));
        return response;
    }
    catch (e) {
        console.error("Error in Elastic Search - index document " + event.transactionIdentifier + ":" + JSON.stringify(e))
    }
}//eventsModel.saveProductEvent

eventsModel.dumpSoaringEvent = async function (topic,event) {
    console.log(" event.transactionIdentifier"+ event.transactionIdentifier)
    console.log(" event type "+ event.eventType)
    try {
        var response = await client.index({
            index: topic,
            type: event.eventType,
            body: event
        }
        );

        console.log("Response: " + JSON.stringify(response));
        return response;
    }
    catch (e) {
        console.error("Error in Elastic Search - index document " + event.transactionIdentifier + ":" + JSON.stringify(e))
    }
}//eventsModel.dumpSoaringEvent