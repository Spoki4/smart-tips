import {Container, Service} from "typedi";
import {Connection, createConnection, useContainer} from "typeorm";

@Service()
export class Database {
  private connection: Promise<Connection>;

  constructor(private readonly databaseUri: string) {
    useContainer(Container);
    this.connection = this.createConnection();
  }

  async getConnection() {
    try {
      const connection = await this.connection;
      if (!connection.isConnected) {
        this.connection = this.createConnection()
      }
    } catch (error) {
      console.error(`Database connection failed: ${error}`);
    }
    return this.connection
  }

  private createConnection(): Promise<Connection> {
    return createConnection({
      type: "postgres",
      url: this.databaseUri,
      synchronize: true,
      entities: [
        `${__dirname}/entities/**/*.ts`,
        `${__dirname}/entities/**/*.js`
      ],
      logging: ["query", "schema", "error", "warn", "info", "log", "migration"]
    }).then(async connection => {
      console.info(`Database connection successful`);
      return connection
    })
  }
}