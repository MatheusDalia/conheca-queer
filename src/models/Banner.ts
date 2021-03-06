import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Banner {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string
}