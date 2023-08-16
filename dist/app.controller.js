"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const jwt_1 = require("@nestjs/jwt");
let AppController = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
    }
    async register(mobile, firstname, lastname, email) {
        if (mobile == '') {
            return {
                status: false,
                message: "Mobile doesn't have a default value."
            };
        }
        else if (firstname == "") {
            return {
                status: false,
                message: "First name doesn't have a default value."
            };
        }
        else if (lastname == "") {
            return {
                status: false,
                message: "Last name doesn't have a default value."
            };
        }
        const unique_mobile = await this.appService.findOne({ mobile });
        if (unique_mobile) {
            return { status: false, message: "Mobile number already exists in our database.", mobile: mobile };
        }
        if (email != '') {
            const unique_email = await this.appService.findOne({ email });
            if (unique_email) {
                return { status: false, message: "Email-id already exists in our database." };
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
        return { status: true,
            message: "User register successfully.",
            detail: user,
        };
    }
    async login(mobile, response) {
        const user = await this.appService.findOne({ mobile });
        if (!user) {
            return { status: false,
                message: "User does't exist",
                mobile: mobile };
        }
        const jwt = await this.jwtService.signAsync({ id: user.id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            status: true,
            message: user,
            jwtTokken: jwt
        };
    }
    async user(request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const user = await this.appService.findOne({ id: data['id'] });
            return user;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async otpVerify(mobile, otp, response) {
        const check_mobile = await this.appService.otpVerify({ mobile });
        if (check_mobile.otp == otp) {
            return {
                status: true,
                detail: check_mobile,
                mobile: mobile
            };
        }
        else {
            return {
                status: false,
                message: "Wrong otp",
                mobile: mobile
            };
        }
    }
    async logout(response) {
        response.clearCookie('jwt');
        return {
            message: 'success'
        };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('mobile')),
    __param(1, (0, common_1.Body)('firstname')),
    __param(2, (0, common_1.Body)('lastname')),
    __param(3, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('mobile')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('otpVerify'),
    __param(0, (0, common_1.Body)('mobile')),
    __param(1, (0, common_1.Body)('otp')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "otpVerify", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        jwt_1.JwtService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map