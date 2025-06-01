import { BadRequestException } from "@nestjs/common";

export function markAnswer(questionAnswer: string[], userAnswer: string[]): boolean[]  | never {
    //Check if the answer provide has same length as the question answer
    if(questionAnswer.length != userAnswer.length){
        throw new BadRequestException("The  answer array must be equal to the number of question");
    }

    let score: boolean[] = [];

    //Loop throught the question answers and answer providered index by index
    //returning true if the answer equals the question answer
    for(let i = 0; i < questionAnswer.length; i++){
        score.push(questionAnswer[i] === userAnswer[i])
    }

    return score;
}