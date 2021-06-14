const connection = require('../db-config');
const Joi = require('joi');
const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      email: Joi.string().email().max(255).presence(presence),
      firstname: Joi.string().max(255).presence(presence),
      lastname: Joi.string().max(255).presence(presence),
      city: Joi.string().max(255),
      language: Joi.string().max(255),
    }).validate(data, { abortEarly: false }).error;
};

const findMany = ({ filters: { language } }) => {
  let sql = 'SELECT * FROM users';
  const sqlValues = [];
  if (language) {
    sql += ' WHERE language = ?';
    sqlValues.push(language);
  }
  return db.query(sql, sqlValues).then(([results]) => results);
};

const findOne = (id) => {
    return db.query('SELECT * FROM users WHERE id = ?',[id])
    .then(([results]) => {
        if (results.length==0){
            return Promise.reject('RECORD_NOT_FOUND')
        }
        return results;
    }
    );
};
const findEmail = (email) => {
  return db
    .query('SELECT * FROM users WHERE email = ?', [email])
    .then(([results]) => results[0]);
};
const createOne = ({firstname, lastname, email, city, language}) => {

    return db.query(
        'INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)',
        [firstname, lastname, email, city, language])
        .then (([result])=> {
          const id = result.insertId;
          const createdUser = { id, firstname, lastname, email, city, language };
          return createdUser;
        });
};

const update = (id, newAttributes) => {
    return db.query('UPDATE users SET ? WHERE id = ?', [newAttributes, id]);
};
  
const destroy = (id) => {
    return db
      .query('DELETE FROM users WHERE id = ?', [id])
      .then(([result]) => result.affectedRows !== 0);
};




module.exports = {

  findMany, findOne, findEmail, createOne, update, destroy, validate

}