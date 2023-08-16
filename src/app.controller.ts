import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import {AppService} from './app.service';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';

@Controller('api')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private jwtService: JwtService
    ) {
    }

    @Post('register')
    async register(
        @Body('mobile') mobile: string,
        @Body('firstname') firstname: string,
        @Body('lastname') lastname: string,
        @Body('email') email: string,
    ) {
       
        if(mobile ==''){
            return {
                status:false,
                message:"Mobile doesn't have a default value."
            }
        }
        else if(firstname==""){
            return {
                status:false,
                message:"First name doesn't have a default value."
            } 
        }
        else if(lastname==""){
            return {
                status:false,
                message:"Last name doesn't have a default value."
            } 
        }

        const unique_mobile = await this.appService.findOne({mobile});

        if (unique_mobile) {
           return { status:false,message:"Mobile number already exists in our database.",mobile:mobile}
        }
        if(email!=''){
        const unique_email = await this.appService.findOne({email});
        if (unique_email) {
            return {status:false,message:"Email-id already exists in our database."}
        }
          }

let otp = ("" + Math.random()).substring(2, 6);
       
        const user = await this.appService.create({
            mobile,
            firstname,
            lastname,
            email,
            otp,
        });

            return {status:true,
                message:"User register successfully.",
                detail:user,
            }
        
    }

    @Post('login')
    async login(
        @Body('mobile') mobile: string,
        @Res({passthrough: true}) response: Response
    ) {
        
        const user = await this.appService.findOne({mobile});

        if (!user) {
            return { status:false,
                message:"User does't exist",
                mobile:mobile}
        }


        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});

        return {
            status:true,
            message: user,
            jwtTokken:jwt
        };
    }

    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.appService.findOne({id: data['id']});


            return user;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('otpVerify')
    async otpVerify(
        @Body('mobile') mobile: string,
        @Body('otp') otp: string,
        @Res({passthrough: true}) response: Response
    ){
      
        const check_mobile = await this.appService.otpVerify({mobile});

        if (check_mobile.otp==otp) {
            return { 
                status:true,
                detail:check_mobile,
                mobile:mobile}
             }
             else{
                return { 
                    status:false,
                    message:"Wrong otp",
                    mobile:mobile}
                 }  
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }
}
