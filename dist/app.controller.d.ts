import { AppService } from './app.service';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';
export declare class AppController {
    private readonly appService;
    private jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    register(mobile: string, firstname: string, lastname: string, email: string): Promise<{
        status: boolean;
        message: string;
        mobile?: undefined;
        detail?: undefined;
    } | {
        status: boolean;
        message: string;
        mobile: string;
        detail?: undefined;
    } | {
        status: boolean;
        message: string;
        detail: import("./user.entity").User;
        mobile?: undefined;
    }>;
    login(mobile: string, response: Response): Promise<{
        status: boolean;
        message: string;
        mobile: string;
        jwtTokken?: undefined;
    } | {
        status: boolean;
        message: import("./user.entity").User;
        jwtTokken: string;
        mobile?: undefined;
    }>;
    user(request: Request): Promise<import("./user.entity").User>;
    otpVerify(mobile: string, otp: string, response: Response): Promise<{
        status: boolean;
        detail: import("./user.entity").User;
        mobile: string;
        message?: undefined;
    } | {
        status: boolean;
        message: string;
        mobile: string;
        detail?: undefined;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
