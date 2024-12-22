import { DataTypes, Sequelize, Model} from 'sequelize';
import { Game } from './Games';

interface UserAttributes {
    user_id: number;
    username: string;
    email: string;
    password: string;
    favorites: Game[];

}

interface UserCreationAttributes extends UserAttributes {}


export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public favorites!: Game[];


}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      favorites:
      {
        type: DataTypes.JSON,
        defaultValue: []
      }
    },
    {
      sequelize,
      // Manually define the table name
      tableName: 'User',
      // Set to false to remove the `created_at` and `updated_at` columns
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return User;
}
