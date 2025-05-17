import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { Track } from "src/common/enums/track.enum";

export class updateUserTrackDto{
    
    @Transform(({ value })=> value.map((t: string) => t.toLowerCase()))
    @IsArray()
    @IsEnum(Track, {each: true})
    @IsNotEmpty()
    tracks: Track[]
}