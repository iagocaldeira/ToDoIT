/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title:{
      type: 'string',
      required:true
    },
    description:{
      type: 'string',
      required: true
    },
    status:{
      type: 'string',
      enum: ['À Fazer', 'Em Andamento', 'Pronto'],
      defaultsTo: 'todo',
      required: true
    },
    author:{
            model:'User'
        }
  }
};
