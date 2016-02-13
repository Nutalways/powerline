module.exports = function(db, config){
    var method = {};

    method['list'] = function(){
      return db.object.device;
    };

    method['getById'] = function(id){
      return db('device').getById(id);
    };

    return method;
}
