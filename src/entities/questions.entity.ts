import { Assessments } from "src/assessments/entity/assessment.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Questions{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text",
        nullable: false
    })
    text: string;

    @Column({
        type: "text",
        nullable: false,
        array: true
    })
    options: string[];

    @Column({
        type: "char",
        nullable: false
    })
    correct_answer: string;

    @ManyToOne(()=> Assessments, (assessment)=> assessment.questions)
    assessment:  Assessments
}