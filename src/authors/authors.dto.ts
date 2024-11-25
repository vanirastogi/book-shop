import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto{

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsString()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phoneNo?: string;
}