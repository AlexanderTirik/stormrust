import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1610052973890 implements MigrationInterface {
    name = 'UserEntity1610052973890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "steamId" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "UQ_1618b9764cfe5f193c45aa38277" UNIQUE ("steamId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
