const config = require('../config/config');
const openaiService = require('./openaiService');
const ollamaService = require('./ollamaService');
const customService = require('./customService');
const azureService = require('./azureService');

class AIServiceFactory {
  static _selectProvider(task = 'document', failureType = null) {
    if (failureType && config.fallbackProviders[failureType]) {
      return config.fallbackProviders[failureType];
    }
    if (task === 'chat') {
      return config.chatProvider || config.aiProvider;
    }
    return config.aiProvider;
  }

  static getService(task = 'document', failureType = null) {
    const provider = this._selectProvider(task, failureType);
    switch (provider) {
      case 'ollama':
        return ollamaService;
      case 'custom':
        return customService;
      case 'azure':
        return azureService;
      case 'openai':
      default:
        return openaiService;
    }
  }
}

module.exports = AIServiceFactory;
