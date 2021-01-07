import { Column, Entity, Unique } from "typeorm";
import { AbstractEntity } from "../abstract/AbstractEntity";

@Entity()
@Unique(['steamId'])
export class User extends AbstractEntity {
    @Column()
    steamId: string;

    @Column()
    displayName: string;
}