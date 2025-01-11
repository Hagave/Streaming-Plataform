import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { PostLoginDTO } from './dto/postLogin.dto';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/decorators/public';

@Controller('login')
export class LoginController {
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() postLoginDto: PostLoginDTO) {
    const user = await this.loginService.validateUserLogin(postLoginDto);
    return this.authService.login(user);
  }
}
