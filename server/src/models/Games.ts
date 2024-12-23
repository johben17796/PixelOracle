// just for the record, GAME in this really means "favorited game"


import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
// import { User } from './Users.js';

interface GameAttributes {
  game_id: number;
  name: string;
  slug: string;
  background_image: string;
  released: string;
  userfav_id: number;

}


interface GameCreationAttributes extends Optional<GameAttributes, 'game_id'> { }


export class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
  public game_id!: number;
  public name!: string;
  public slug!: string;
  public background_image!: string;
  public released!: string;
  public userfav_id!: number;

  // public readonly userfav?: User

}

export function GameFactory(sequelize: Sequelize): typeof Game {
  Game.init(
    {
      game_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
      background_image: {
        type: DataTypes.STRING,
      },
      released: {
        type: DataTypes.STRING,
      },
      userfav_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }



    },
    {
      sequelize,

      tableName: 'Game',
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Game;
}
