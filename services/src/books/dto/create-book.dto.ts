import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0) 
    publishedDate: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;
}