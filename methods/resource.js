const Promise = require('bluebird');
var models = require('../models');
var Sequelize = require('sequelize');
const methods = require('../methods')
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
const language = require('@google-cloud/language');

var sequelize ={};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var resourcemethods = {};

resourcemethods.analyzeSyntax = async function(info){

    var reviewInsight = {};
    // Instantiates a client
    const client = new language.LanguageServiceClient();
  
    const document = {
      content: info.value,
      type: 'PLAIN_TEXT',
    };
    // Detects the sentiment of the text
    const [sentimentResult] = await client.analyzeSentiment({document: document});
    const sentiment = sentimentResult.documentSentiment;
  
    const [entityResult] = await client.analyzeEntities({document: document});
    const entity = entityResult.entities;  

    reviewInsight.id = info.id;
    reviewInsight.sentiment = sentiment;
    reviewInsight.entity = entity;
    console.log(reviewInsight);
    return reviewInsight;
  }

  module.exports = resourcemethods;