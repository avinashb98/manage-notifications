const csv = require('csvtojson');
const path = require('path');
const Notification = require('../src/models/notification');

const fileName = 'interview_notification.csv';

const readCSV = async (path) => {
  return await csv().fromFile(path);
}

const parseData = (jsonData) => {
  const rawData = jsonData;
  const structuredData = {};
  rawData.forEach((data) => {
    if (structuredData[data.notification_id]) {
      structuredData[data.notification_id].push({
        device_token_hash: data.device_token_hash,
        site_id: data.site_id,
        has_unsubscribed: !!(data.has_unsubscribed),
        is_clicked: !!(data.is_clicked),
        is_viewed: !!(data.is_viewed),
        ts_updated: data.ts_updated,
        ts_created: data.ts_created
      });
    } else {
      structuredData[data.notification_id]= [];
    }
  });
  return structuredData;
}

const formatData = (structuredData) => {
  const formattedData = [];
  for (id in structuredData) {
    formattedData.push({
      notification_id: id,
      devices: structuredData[id]
    });
  }
  return formattedData;
}

const fillSeedData = async (data) => {
  const jsonData = await readCSV(path.join(__dirname, fileName));
  const structuredData = parseData(jsonData);
  const formattedData = formatData(structuredData);
  console.log('Inserting Seed Data...');
  await Notification.insertMany(formattedData);
  console.log('Seed Data Insertion Complete.');
}

module.exports = fillSeedData;
