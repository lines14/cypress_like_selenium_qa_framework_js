const moment = require('moment');
const JSONMapper = require('./JSONMapper');
const JSONLoader = require('./JSONLoader');
const { parseStringPromise } = require('xml2js');

class DataUtils {
    static async XMLToJSON(xml) {
        return (await parseStringPromise(xml)).response;
    }

    static mapPolicyESBDToTWB(
        getPolicyData, 
        getContract_By_NumberData, 
        getClientByIDData
        ) {
        const firstMappedPart = JSONMapper.mapValues(
            getPolicyData, 
            getContract_By_NumberData, 
            JSONLoader.getContract_By_NumberToGetPolicyMapSchema
        );
        const secondMappedPart = JSONMapper.mapValues(
            getPolicyData, 
            getClientByIDData, 
            JSONLoader.getClientByIDToGetPolicyMapSchema
        );
        const mappedData = { ...firstMappedPart, ...secondMappedPart };
        mappedData.date_create = (moment(mappedData.date_create, JSONLoader.dictESBD.timeFormat))
        .format(JSONLoader.dictTWB.timeFormat);
        const rewritedData = JSONMapper.rewriteValues(mappedData, JSONLoader.dictTWB, JSONLoader.dictESBD);
        return JSONMapper.unflattenJSON(rewritedData);
    }
}

module.exports = DataUtils;