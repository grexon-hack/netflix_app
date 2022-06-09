import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';


export const User = sequelize.define('Users', {
    id : {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    picture: {
        type: DataTypes.STRING,
        defaultValue : "https://aumentada.net/wp-content/uploads/2015/05/user.png",
        validate: {
            isUrl : true
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        
    }
});

export const Content = sequelize.define('Contents', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true

    },
    name : {
        type: DataTypes.STRING,
        allowNull:false
    },
    image : {
        type : DataTypes.STRING,
        allowNull: false
    }


});

export const Category = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nameCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    

});

export const Favorities = sequelize.define('Favorities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true

    },
    name : {
        type: DataTypes.STRING,
        allowNull:false
    },
    image : {
        type : DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Favorities);
Favorities.belongsTo(User);

User.hasMany(Content);
Content.belongsTo(User);

Content.hasMany(Category);
Category.belongsTo(Content);