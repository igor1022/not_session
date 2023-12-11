import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';

class Lot extends Model {}
Lot.init({
    area: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    revenue: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    cadastral_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'not specified'
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'not specified'
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'not specified'
    },
    tenant: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'not specified',
        
    },
    lease_term: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    lot_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'new'
    },
    message_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lotNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bot_id: {
        type: DataTypes.TEXT,
        allowNull: true
    }  

}, {
    freezeTableName: false,
    timestamps: true,
    modelName: 'lots',
    sequelize
});

const findLot = async (i) => {
    const res = await Lot.findAll();
    return res[i].dataValues;
};

const findAllState = async () => {
    const res = await Lot.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('state')) ,'state'],
        ]
    });
    const states_all = [];
    for (let i = 0; i < res.length; i++) {
        states_all.push(res[i].dataValues); 
    }  
    return states_all;
}

const getPartBd = async (selected) => {
    const arr = [];
    for (let i = 0; i < selected.length; i++) {
        arr.push(selected[i].value);
    }
    const res = await Lot.findAll({
        where: {
          state: arr, // id: { [Op.in]: [1, 2, 3] }
        },
      })
    return res;
}

const findCount = async () => {
    const res = await Lot.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('*')), 'count_record'],
        ]
      });
    return res[0].dataValues;
}

const UpdatePriceLot = async (id, new_price) => {
    await Lot.update({ price: new_price }, {
        where: {
          id: id
        },
    });
}

const DeleteElem = async (id) => {
    await Lot.destroy({
        where: {
          id: id
        },
      });
}

const createNewLot = async (obj) => {
    const res = await Lot.create({area: obj.area, cadastral_number: obj.cadastral_number,
        lotNumber: obj.lotNumber, price: obj.price, region: obj.region, 
        revenue:obj.revenue, state: obj.state, tenant: obj.tenant, lot_status: 'new'});
    const lenght = await findCount();
    return lenght;
};

export {
    Lot,
    findLot,
    findCount,
    UpdatePriceLot,
    findAllState,
    getPartBd,
    DeleteElem,
    createNewLot
};   