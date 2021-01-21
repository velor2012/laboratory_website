import SearchDTO from "./search.dto"
import { IsString, IsNotEmpty } from "class-validator";

import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class RelationDto extends SearchDTO{
    @ApiProperty({
        required: true,
        enum:["projects","users","competitions","patents","papers"],
        description: "需要查找的关系名称，如users,projects等",
        example: "projects"
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    relation: string;
}