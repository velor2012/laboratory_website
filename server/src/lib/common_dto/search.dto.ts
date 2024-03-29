import { ApiProperty } from "@nestjs/swagger";
import {
    IsNumber,
    IsString,
    IsObject,
    IsNotEmpty,
    IsJSON,
    IsOptional,
    IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";

export default class SearchDTO {
    @ApiProperty({
        required: true,
        description: "分页大小，设置为小于等于0或者不提供该参数时返回所有数据",
        example: 5,
    })
    @IsNumber()
    @Type(() => Number)
    pageSize: number = 0;

    @ApiProperty({
        required: true,
        description: "页数，设置为小于等于0或者不提供该参数时返回所有数据",
        example: 1,
    })
    @IsNumber()
    @Type(() => Number)
    page: number = 0;

    @IsBoolean()
    @Type(()=>Boolean)
    withRelation:boolean = false;
}
