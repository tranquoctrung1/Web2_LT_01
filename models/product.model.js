const db = require('../utils/db');

const TBL_Products = 'products';

module.exports = {
  all: function () {
    return db.load(`select * from ${TBL_Products}`);
  },
  single: function (id) {
    return db.load(`select * from ${TBL_Products} where ProID = ${id}`);
  },
  add: function (entity) {
    return db.add(TBL_Products, entity);
  },
  patch: function (entity) {
    const condition = {
      ProID: entity.ProID
    }
    delete entity.ProID;
    return db.patch(TBL_Products, entity, condition);
  },
  del: function (id) {
    const condition = {
      ProID: id
    }
    return db.del(TBL_Products, condition);
  }
};
