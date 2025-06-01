import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse{
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGFuaWVsLm9jaGlnYm9AbXRuLmNvbSIsImlhdCI6MTc0ODY5MjY4NSwiZXhwIjoxNzQ4Njk2Mjg1fQ.iYOLE18FJu2m3pfDGL4y1vVNblST_9Wtl7sm_32g6k8"
    })
    token: string

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0ODY5MjY4NSwiZXhwIjoxNzQ4Nzc5MDg1fQ.zgEYRS1QQrWz8JUBEOWHToHbSW0j-AM0GNLVUF4y1cI"
    })
    refreshToken: string
    
}
export class WrongUserNameResponse{
    @ApiProperty({
        example: "Username dose not exist",
    })
    message: string

    @ApiProperty({
        example: "Not Found"
    })
    error: string

    @ApiProperty({
        example: 404
    })
    statuscode: number
}

export class WrongPasswordResponse{
    @ApiProperty({
        example: "Wrong password"
    })
    message: string
    
    @ApiProperty({
        example: "Bad Request"
    })
    error: string

    @ApiProperty({
        example: 400
    })
    statuscode: number
}