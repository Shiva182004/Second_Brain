import { Sequelize } from 'sequelize-typescript';
import { User } from './user.js';
import { sequelize } from './db.js';
import { Content } from './content.js';

sequelize.addModels([User, Content]);

// Define associations
User.hasMany(Content, { foreignKey: 'userId' });
Content.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, Sequelize, User, Content };
export default sequelize;