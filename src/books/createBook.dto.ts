import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto{

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    genre : string;

    @IsString()
    authorId : string;
}