const { DataTypes } = require('sequelize');

module.exports = {
  attributes: {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  },
  getOptions: ({ tableName, withSoftDelete = false } = {}) => {
    const options = {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName,
    };

    if (withSoftDelete) {
      options.paranoid = true;
      options.deletedAt = 'deleted_at';
    }

    return options;
  },
};
