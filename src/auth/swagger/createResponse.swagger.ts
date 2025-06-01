import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponse{
    @ApiProperty({
        example: "User successfully created"
    })
    message: string
}