import { IsEnum, IsOptional } from "class-validator";
import { Status } from "src/common/enums/status.enum";

export class EnrollmentStatusQueryDTO{
    @IsOptional()
    @IsEnum(Status)
    status?: Status
}